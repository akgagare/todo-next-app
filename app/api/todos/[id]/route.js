import connectMongo from "@/lib/mongodb";
import Todo from "@/models/Todo";

// GET /api/todos/[id]
export async function GET(req, { params }) {
  try {
    await connectMongo();
    const data = await Todo.findById(params.id); // ✅ Use params.id directly
    console.log("Data in GET of id", data);
    return Response.json(data);
  } catch (error) {
    console.error("Error in GET of id", error);
    return new Response("Failed to fetch todo", { status: 500 });
  }
}

// PUT /api/todos/[id]
export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const body = await req.json();
    
    const updated = await Todo.findByIdAndUpdate(params.id, body, { new: true });
    return Response.json(updated);
  } catch (error) {
    console.error("Error in PUT of id", error);
    return new Response("Failed to update todo", { status: 500 });
  }
}

// DELETE /api/todos/[id]
export async function DELETE(req, { params }) {
  try {
    
    await connectMongo();
    await Todo.findByIdAndDelete(params.id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE of id", error);
    return new Response("Failed to delete todo", { status: 500 });
  }
}
