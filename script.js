const API = "https://YOUR_BACKEND_URL";

async function loadEmails() {
  const res = await fetch(`${API}/fetchEmails`);
  const emails = await res.json();

  const list = document.getElementById("emails");
  list.innerHTML = "";

  emails.forEach(e => {
    const li = document.createElement("li");
    li.innerText = e.subject;
    li.onclick = () => summarize(e.body);
    list.appendChild(li);
  });
}

async function summarize(text) {
  document.getElementById("summary").innerText = "Summarizing...";

  const res = await fetch(`${API}/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await res.json();
  document.getElementById("summary").innerText = data.summary;
}

loadEmails();
setInterval(loadEmails, 60000); // real-time polling
