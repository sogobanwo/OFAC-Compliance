export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
        "header": "eyJmaWQiOjkxNTIsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMmVmNzkwRGQ3OTkzQTM1ZkQ4NDdDMDUzRURkQUU5NDBEMDU1NTk2In0",
        "payload": "eyJkb21haW4iOiJyZXdhcmRzLndhcnBjYXN0LmNvbSJ9",
        "signature": "MHgxMGQwZGU4ZGYwZDUwZTdmMGIxN2YxMTU2NDI1MjRmZTY0MTUyZGU4ZGU1MWU0MThiYjU4ZjVmZmQxYjRjNDBiNGVlZTRhNDcwNmVmNjhlMzQ0ZGQ5MDBkYmQyMmNlMmVlZGY5ZGQ0N2JlNWRmNzMwYzUxNjE4OWVjZDJjY2Y0MDFj"
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
