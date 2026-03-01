import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        user_id: null,
        title: body.title,
        description: body.description,
        status_code: body.status_code,
        priority_code: body.priority_code,
        category: body.category,
        due_date: body.due_date,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}

