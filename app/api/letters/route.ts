import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/_lib/db';
import LetterModel from '@/app/_lib/models/Letter';
import type { LetterData } from '@/app/_lib/types';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      id,
      recipientName,
      salutation,
      dateStr,
      placeStr,
      body: letterBody,
      signOff,
      senderName,
      postScript,
      waxSealDesign,
      waxSealColor,
      envelopeColor,
      language,
    } = body;

    // Validate required fields
    if (!recipientName || !salutation || !letterBody || !signOff || !senderName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required letter fields (recipientName, salutation, body, signOff, senderName)',
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const letterId = id || crypto.randomUUID().slice(0, 12);

    const letterDoc = await LetterModel.findOneAndUpdate(
      { letterId },
      {
        letterId,
        recipientName,
        salutation,
        dateStr: dateStr || new Date().toLocaleDateString(),
        placeStr: placeStr || '',
        body: letterBody,
        signOff,
        senderName,
        postScript: postScript || '',
        waxSealDesign: waxSealDesign || 'iti',
        waxSealColor: waxSealColor || 'crimson',
        envelopeColor: envelopeColor || '#7F1D1D',
        language: language || 'bn',
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    const letterData: LetterData = {
      id: letterDoc.letterId,
      createdAt: letterDoc.createdAt.getTime(),
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

    return NextResponse.json(
      {
        success: true,
        id: letterDoc.letterId,
        letter: letterData,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error saving letter to MongoDB:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const count = await LetterModel.countDocuments();
    return NextResponse.json({
      success: true,
      service: 'neelkhaam-digital-letters',
      totalLetters: count,
    });
  } catch (error: unknown) {
    console.error('Error checking database status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Database connection error',
      },
      { status: 500 }
    );
  }
}
