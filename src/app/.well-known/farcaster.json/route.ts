export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "",
      payload: "",
      signature:
        "",
    },
    frame: {
      version: "1",
      name: "OFAC Compliance Checker",
      iconUrl: `https://res.cloudinary.com/dnohqlmjc/image/upload/v1747202727/ComplianceShield_vfpoqn.png`,
      homeUrl: appUrl,
      imageUrl: `https://res.cloudinary.com/dnohqlmjc/image/upload/v1747202727/ComplianceShield_vfpoqn.png`,
      buttonTitle: "OFAC Compliance Checker",
      splashImageUrl: `https://res.cloudinary.com/dnohqlmjc/image/upload/v1747202727/ComplianceShield_vfpoqn.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
