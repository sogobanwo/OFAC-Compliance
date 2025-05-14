export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
      "accountAssociation": {
        "header": "eyJmaWQiOjk5NjU0MiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDFGNUUwMzM1NjRBMzUyYWNhZDYyQzlmMTJGNDQxMzk1RkM4QjMzRkYifQ",
        "payload": "eyJkb21haW4iOiJvZmFjLWNvbXBsaWFuY2UudmVyY2VsLmFwcCJ9",
        "signature": "MHgzYzZiMDI1N2JlOTI1NDNkNmYwZWZmOTM2NjA2ZDJkYjE2NDdjMTQwNDI0ODA4ZTk5ZTY0ZDgzZWE0MWMzYzBiMDdiNWZkY2VlY2JkOThlMjVjYzFhNzQ4ZmQ0OTU0ZmVjNWFiNDM4N2Y5OTQ4MTkxNTk0NTUxMWUzMzIzNGJjMzFi"
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
