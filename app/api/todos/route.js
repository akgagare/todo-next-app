import connectMongo from "@/lib/mongodb";
import Todo from "@/models/Todo";

export async function GET() {
  await connectMongo();
  const todos = await Todo.find();
  return Response.json(todos);
}

export async function POST(req) {
  await connectMongo();
  const body = await req.json();
  const todo = await Todo.create(body);
  return Response.json(todo);
}
