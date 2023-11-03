import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient()

export async function GET() {
    // todoテーブルから全件取得
    const todos: Todo[] = await prisma.todo.findMany()
    return Response.json(todos)
}