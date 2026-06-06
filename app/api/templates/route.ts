import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../../lib/db';

export async function GET(req: Request) {
  try {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const templates = await prisma.chequeTemplate.findMany({
      where: { userId: token.id as string },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, width, height, imageUrl, coords } = await req.json();

    if (!name || !width || !height || !coords) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const template = await prisma.chequeTemplate.create({
      data: {
        name,
        width: parseFloat(width),
        height: parseFloat(height),
        imageUrl,
        coords: typeof coords === 'string' ? coords : JSON.stringify(coords),
        userId: token.id as string,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error saving template:', error);
    return NextResponse.json({ error: 'Failed to save template' }, { status: 500 });
  }
}
