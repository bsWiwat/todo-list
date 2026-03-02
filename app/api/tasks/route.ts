import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const sort = searchParams.get("sort");

  let query = supabase.from("tasks").select("*").is("deleted_at", null);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (status) {
    query = query.eq("status_code", status);
  }

  if (priority) {
    query = query.eq("priority_code", priority);
  }

  if (sort === "asc") {
    query = query.order("created_at", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

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

