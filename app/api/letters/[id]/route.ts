import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/_lib/db';
import LetterModel from '@/app/_lib/models/Letter';
import type { LetterData } from '@/app/_lib/types';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Letter ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Increment views and set firstOpenedAt if not set
    const letterDoc = await LetterModel.findOneAndUpdate(
      { letterId: id },
      {
        $inc: { views: 1 },
        $setOnInsert: { firstOpenedAt: new Date() },
      },
      { returnDocument: 'after' }
    );

    if (!letterDoc) {
      return NextResponse.json(
        { success: false, error: 'Letter not found' },
        { status: 404 }
      );
    }

    // Set firstOpenedAt on first view if it wasn't set
    if (!letterDoc.firstOpenedAt) {
      letterDoc.firstOpenedAt = new Date();
      await letterDoc.save();
    }

    const letterData: LetterData = {
      id: letterDoc.letterId,
      createdAt: letterDoc.createdAt ? letterDoc.createdAt.getTime() : Date.now(),
      recipientName: letterDoc.recipientName,
      salutation: letterDoc.salutation,
      dateStr: letterDoc.dateStr,
      placeStr: letterDoc.placeStr,
      body: letterDoc.body,
      signOff: letterDoc.signOff,
      senderName: letterDoc.senderName,
      postScript: letterDoc.postScript,
      waxSealDesign: letterDoc.waxSealDesign,
      waxSealColor: letterDoc.waxSealColor,
      envelopeColor: letterDoc.envelopeColor,
      language: letterDoc.language,
    };

    return NextResponse.json({
      success: true,
      letter: letterData,
      views: letterDoc.views,
      firstOpenedAt: letterDoc.firstOpenedAt,
    });
  } catch (error: unknown) {
    console.error('Error fetching letter by ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Letter ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updateFields: Record<string, unknown> = {};
    if (body.markOpened) {
      updateFields.firstOpenedAt = new Date();
    }

    const updated = await LetterModel.findOneAndUpdate(
      { letterId: id },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Letter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Letter updated successfully',
    });
  } catch (error: unknown) {
    console.error('Error updating letter:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
