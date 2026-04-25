import { NextResponse } from 'next/server'
import { formatAlertMessage } from '../../../lib/sendAlert'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      patientName, patientAge, village,
      symptoms, severity, referralReason, doctorPhone,
    } = body

    if (!doctorPhone) {
      return NextResponse.json(
        { message: 'Doctor phone number is required' },
        { status: 400 }
      )
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken  = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM // e.g. "whatsapp:+14155238886"

    if (!accountSid || !authToken || !fromNumber) {
      // In development, log the message and return success
      const message = formatAlertMessage({ patientName, patientAge, village, symptoms, severity, referralReason })
      console.log('--- ALERT MESSAGE (Twilio not configured) ---')
      console.log(message)
      console.log('Would send to:', doctorPhone)
      console.log('---------------------------------------------')

      return NextResponse.json({
        success: true,
        message: 'Alert logged (Twilio not configured — check your server console)',
      })
    }

    // Format the to number as a WhatsApp number
    const toNumber = doctorPhone.startsWith('whatsapp:')
      ? doctorPhone
      : `whatsapp:${doctorPhone.startsWith('+') ? doctorPhone : `+91${doctorPhone}`}`

    const alertMessage = formatAlertMessage({
      patientName, patientAge, village, symptoms, severity, referralReason,
    })

    // Send via Twilio REST API
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`

    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: toNumber,
        Body: alertMessage,
      }),
    })

    if (!twilioResponse.ok) {
      const err = await twilioResponse.json()
      console.error('Twilio error:', err)
      return NextResponse.json(
        { message: 'Failed to send WhatsApp message. Check Twilio credentials.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: 'Alert sent successfully!' })
  } catch (err) {
    console.error('Alert route error:', err)
    return NextResponse.json(
      { message: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}
