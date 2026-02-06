import { google } from "googleapis";

export default async function handler(req, res) {
  const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const gmail = google.gmail({ version: "v1", auth });

  const list = await gmail.users.messages.list({
    userId: "me",
    q: "is:unread"
  });

  const emails = [];

  for (const msg of list.data.messages || []) {
    const data = await gmail.users.messages.get({
      userId: "me",
      id: msg.id
    });

    emails.push({
      subject: data.data.payload.headers.find(h => h.name === "Subject")?.value,
      body: Buffer.from(
        data.data.payload.parts?.[0]?.body?.data || "",
        "base64"
      ).toString()
    });
  }

  res.json(emails);
}
