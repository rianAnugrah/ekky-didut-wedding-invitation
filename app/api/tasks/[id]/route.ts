
import { NextRequest, NextResponse } from 'next/server';
import { getRecordById, updateRecord, deleteRecord } from '@/lib/airtable';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;
  try {
    const task = await getRecordById(id);
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;
  try {
    const body = await request.json();
    const updatedTask = await updateRecord(id, body);
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;
  try {
    const deletedTask = await deleteRecord(id);
    return NextResponse.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
