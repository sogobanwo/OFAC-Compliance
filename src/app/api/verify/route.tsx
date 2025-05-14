import { NextRequest, NextResponse } from 'next/server';
import { getUserIdentifier, SelfBackendVerifier } from '@selfxyz/core';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { proof, publicSignals } = body;

    if (!proof || !publicSignals) {
      return NextResponse.json(
        { message: 'Proof and publicSignals are required' },
        { status: 400 }
      );
    }

    const userId = await getUserIdentifier(publicSignals);
    console.log("Extracted userId:", userId);

    const selfBackendVerifier = new SelfBackendVerifier(
      'OFAC-compliance-verification', 
      `${process.env.NEXT_PUBLIC_URL}/api/verify`
    );

    // Verify the proof
    const result = await selfBackendVerifier.verify(proof, publicSignals);
    
    if (result.isValid) {
      return NextResponse.json({
        status: 'success',
        result: true,
        credentialSubject: result.credentialSubject
      });
    } else {
      return NextResponse.json({
        status: 'error',
        result: false,
        message: 'Verification failed',
        details: result.isValidDetails
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error verifying proof:', error);
    return NextResponse.json({
      status: 'error',
      result: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}