import { NextApiRequest, NextApiResponse } from 'next';
import { getUserIdentifier, SelfBackendVerifier } from '@selfxyz/core';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { proof, publicSignals } = req.body;

      if (!proof || !publicSignals) {
        return res.status(400).json({ message: 'Proof and publicSignals are required' });
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
        return res.status(200).json({
          status: 'success',
          result: true,
          credentialSubject: result.credentialSubject
        });
      } else {
        return res.status(500).json({
          status: 'error',
          result: false,
          message: 'Verification failed',
          details: result.isValidDetails
        });
      }
    } catch (error) {
      console.error('Error verifying proof:', error);
      return res.status(500).json({
        status: 'error',
        result: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}