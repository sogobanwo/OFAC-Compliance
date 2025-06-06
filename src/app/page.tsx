import { Metadata } from "next";
import VerificationPage from "../components/verification";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/landing.jpg`,
  button: {
    title: "Verify your OFAC Compliance",
    action: {
      type: "launch_frame",
      name: "OFAC Compliance Checker",
      url: appUrl,
      splashImageUrl: `https://res.cloudinary.com/dnohqlmjc/image/upload/v1747202727/ComplianceShield_vfpoqn.png`,
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

export default function Home() {
  return (<VerificationPage />);
}
