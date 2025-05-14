'use client';

import React, { useState, useEffect } from 'react';
import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';
import { sdk } from '@farcaster/frame-sdk';

// Initialize the SDK
async function initializeSDK() {
  await sdk.actions.ready({ disableNativeGestures: true });
}

// Call initialization function
initializeSDK();

const appUrl = process.env.NEXT_PUBLIC_URL;

function VerificationPage() {
  const [userId, setUserId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => setUserId(uuidv4()), []);

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessModal(true);
    }
  }, [isSuccess]);

  if (!userId) return null;

  // Create the SelfApp configuration
  const selfApp = new SelfAppBuilder({
    appName: "OFAC Compliance Checker",
    scope: "OFAC-compliance-verification",
    endpoint: `${process.env.NEXT_PUBLIC_URL}/api/verify`,
    userId,
  }).build();

  const handleVerificationSuccess = () => {
    setIsSuccess(true);
    console.log("Verification successful!");
  };

  const shareOnWarpcast = async () => {
    await sdk.actions.composeCast({
      text: "Get verified with OFAC Compliance Checker powered by self.xyz on @celo",
      embeds: [`${appUrl}`],
    });
  };

  const shareSuccessOnWarpcast = async () => {
    await sdk.actions.composeCast({
      text: "I just got verified by OFAC Compliance Checker powered by self.xyz on @celo 🎉",
      embeds: [`${appUrl}/share`],
    });
    setShowSuccessModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const startVerification = () => {
    setShowVerification(true);
  };

  // Landing page with two options
  if (!showVerification) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#0055A4] p-6 text-white">
            <h1 className="text-2xl font-bold text-center">OFAC Compliance Checker</h1>
          </div>
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome</h2>
              <p className="text-[#6B7280] mb-8">Verify your OFAC compliance status quickly and securely using Self.xyz</p>
              
              <div className="space-y-4">
                <button 
                  onClick={startVerification}
                  className="w-full bg-[#0055A4] hover:bg-[#004183] text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Verify Yourself Now
                </button>
                
                <button 
                  onClick={shareOnWarpcast}
                  className="w-full bg-white border-2 border-[#0055A4] text-[#0055A4] hover:bg-[#E6F0FA] py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Share With Others
                </button>
              </div>
            </div>
            
            <div className="text-center text-sm text-[#6B7280] border-t border-gray-200 pt-4 mt-6">
              <p>Powered by Self.xyz secure identity verification</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verification page with QR code (shown after clicking "Verify Yourself Now")
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full m-4">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Successful!</h2>
              <p className="text-center text-gray-600 mb-6">Share a cast about your verification and get tipped directly!</p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={shareSuccessOnWarpcast}
                  className="w-full bg-[#6E3FF3] hover:bg-[#5930D0] text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 11.5a1.5 1.5 0 01-1.5 1.5H9.5v2.5l-4.5-4 4.5-4v2.5h6a.5.5 0 00.5-.5v-3h1.5v5z"/>
                  </svg>
                  Share on Warpcast & Get Tipped
                </button>
                
                <button 
                  onClick={closeSuccessModal}
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#0055A4] p-6 text-white">
          <h1 className="text-2xl font-bold text-center">OFAC Compliance Verification</h1>
        </div>
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verify Your Identity</h2>
            <p className="text-[#6B7280]">Scan the QR code below with the Self app to complete OFAC compliance verification</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="border-2 rounded-lg p-4 bg-[#E6F0FA] border-[#E6F0FA]">
              <SelfQRcodeWrapper
                selfApp={selfApp}
                onSuccess={handleVerificationSuccess}
                size={250}
              />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <button 
              onClick={() => setShowVerification(false)}
              className="text-[#0055A4] hover:underline"
            >
              ← Back to options
            </button>
            
            <div className="text-[#6B7280] text-sm border-t border-gray-200 pt-4">
              <p className="mb-2">Don&apos;t have the Self app yet?</p>
              <div className="flex space-x-4 justify-center">
                <a href="https://apps.apple.com/us/app/self-zk/id6478563710" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#0055A4] hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  iOS
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.proofofpassportapp&pli=1" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#0055A4] hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zm16.5-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-17zM6.53 9.47L17.03 4.5c.76-.43 1.7-.15 2.1.6.4.75.14 1.68-.62 2.1l-10.5 4.97c-.76.43-1.7.15-2.1-.6-.4-.75-.14-1.68.62-2.1z"/>
                  </svg>
                  Android
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-[#6B7280]">
        <p>Secure identity verification powered by <span className="font-medium">Self</span></p>
      </div>
    </div>
  );
}

export default VerificationPage;