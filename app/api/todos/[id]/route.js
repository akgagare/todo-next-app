import connectMongo from "@/lib/mongodb";
import Todo from "@/models/Todo";

export async function GET(request, { params }) {
  try {
    const data = await Todo.findById(params.id);
    console.log("Data in GET of id", data);
    return Response.json(data);
  } catch (error) {
    console.log("Error in GET of id", error);
    return new Response("Failed to fetch todo", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectMongo();
  const body = await req.json();
  const updated = await Todo.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(_, { params }) {
  await connectMongo();
  await Todo.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
