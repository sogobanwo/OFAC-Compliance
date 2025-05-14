import React from "react";
import TipMe from "~/components/TipMe";
import { Metadata } from 'next';

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/tip-me.jpg`,
  button: {
    title: "Tip me, I'm OFAC Verified",
    action: {
      type: "launch_frame",
      name: "OFAC Compliance Checker",
      url: `${appUrl}/tip`,
      splashImageUrl:`https://res.cloudinary.com/dnohqlmjc/image/upload/v1747202727/ComplianceShield_vfpoqn.png`,
      splashBackgroundColor: "#E6F0FA",
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "OFAC Compliance Checker",
    openGraph: {
      title: "OFAC Compliance Checker",
      description: "An OFAC Compliance Checker app.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

const page = () => {
  return <TipMe />;
};

export default page;
