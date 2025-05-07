// Now, let's create our API endpoints using the App Router structure
// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllRecords, createRecord } from '@/lib/airtable';

export async function GET() {
  try {
    const tasks = await getAllRecords();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newTask = await createRecord(body);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
