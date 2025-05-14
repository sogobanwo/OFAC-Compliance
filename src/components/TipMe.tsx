/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

async function initializeSDK() {
  await sdk.actions.ready({ disableNativeGestures: true });
}

initializeSDK();

const TipMe = () => {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState(
    "eip155:42220/erc20:0x471EcE3750Da237f93B8E339c536989b8978a438"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [tipStatus, setTipStatus] = useState<{message: string, success: boolean | null}>({ message: "", success: null });

  // Define token configurations with their decimal places
  const tokenConfigs: Record<string, { name: string; decimals: number }> = {
    "eip155:42220/erc20:0x471EcE3750Da237f93B8E339c536989b8978a438": {
      name: "Celo",
      decimals: 18,
    },
    "eip155:42220/erc20:0x765de816845861e75a25fca122bb6898b8b1282a": {
      name: "cUSD",
      decimals: 18,
    },
    "eip155:42220/erc20:0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e": {
      name: "USDT",
      decimals: 6,
    },
    "eip155:42220/erc20:0xcebA9300f2b948710d2653dD7B07f33A8B32118C": {
      name: "USDC",
      decimals: 6,
    },
  };

  const getFid = async () => {
    const userContext = (await sdk.context).location;
    if (userContext?.type === "cast_embed") {
      const fid = userContext.cast.fid;
      return fid;
    }
  };

  // Function to parse the amount based on token decimals
  const parseTokenAmount = (inputAmount: string, selectedToken: string) => {
    if (
      !inputAmount ||
      isNaN(Number(inputAmount)) ||
      Number(inputAmount) <= 0
    ) {
      return null;
    }

    const config = tokenConfigs[selectedToken as keyof typeof tokenConfigs];
    if (!config) {
      console.error("Unknown token:", selectedToken);
      return null;
    }

    // Convert to appropriate decimal precision
    // For example, 1.0 USDC (6 decimals) becomes "1000000"
    // 1.0 Celo (18 decimals) becomes "1000000000000000000"
    const amountInWei = (
      Number(inputAmount) * Math.pow(10, config.decimals)
    ).toString();
    return amountInWei;
  };

  async function sendVerifiedUserToken() {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setTipStatus({
        message: "Please enter a valid amount",
        success: false,
      });
      return;
    }

    try {
      setIsLoading(true);
      setTipStatus({ message: "", success: false });

      const parsedAmount = parseTokenAmount(amount, token);
      if (!parsedAmount) {
        throw new Error("Failed to parse amount correctly");
      }

      await sdk.actions.sendToken({
        token,
        amount: parsedAmount,
        recipientFid: Number(getFid()),
      });

      setTipStatus({
        message: "Tip sent successfully!",
        success: true,
      });
      setAmount("");
    } catch (error) {
      console.error("Error sending tip:", error);
      setTipStatus({
        message: "Failed to send tip. Please try again.",
        success: false,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#6E3FF3] p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Send a Tip</h1>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <p className="text-gray-600 text-center mb-4">
              Send a tip to thank this user for verifying their OFAC compliance
              status.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="token"
                className="block text-sm font-medium text-gray-700 mb-1 pr-2"
              >
                Select Token
              </label>
              <select
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6E3FF3] focus:border-[#6E3FF3] outline-none transition-all text-gray-600"
              >
                <option value="eip155:42220/erc20:0x471EcE3750Da237f93B8E339c536989b8978a438">
                  Celo
                </option>
                <option value="eip155:42220/erc20:0x765de816845861e75a25fca122bb6898b8b1282a">
                  cUSD
                </option>
                <option value="eip155:42220/erc20:0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e">
                  USDT
                </option>
                <option value="eip155:42220/erc20:0xcebA9300f2b948710d2653dD7B07f33A8B32118C">
                  USDC
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                placeholder="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#6E3FF3] focus:border-[#6E3FF3] outline-none transition-all text-gray-600"
              />
            </div>

            {tipStatus.message && (
              <div
                className={`p-3 rounded-lg text-center ${
                  tipStatus.success
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {tipStatus.message}
              </div>
            )}

            <button
              onClick={sendVerifiedUserToken}
              disabled={isLoading}
              className="w-full bg-[#6E3FF3] hover:bg-[#5930D0] text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Send Tip</>
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Tips are sent directly through the Farcaster protocol</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipMe;
