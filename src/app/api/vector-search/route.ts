export async function POST(req: Request) {
  return new Response(JSON.stringify({ message: "Vector search endpoint pending Pinecone setup." }), { status: 200 });
}
