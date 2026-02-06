import fetch from "node-fetch";

export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.AI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize email with urgency and action points." },
        { role: "user", content: text }
      ]
    })
  });

  const data = await response.json();
  res.json({ summary: data.choices[0].message.content });
}
