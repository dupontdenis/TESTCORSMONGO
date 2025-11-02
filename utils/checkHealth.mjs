import { API_URL } from "../config.mjs";

export async function checkHealth() {
  const container = document.getElementById("items");

  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();

    container.innerHTML = `
          <h2>Health Check:</h2>
          <div class="item">
            <strong>API:</strong> ${data.app}<br>
            <strong>Database:</strong> ${data.db}<br>
            ${
              data.details
                ? `<small>Details: ${JSON.stringify(data.details)}</small>`
                : ""
            }
          </div>
        `;
  } catch (err) {
    const needsBackend = (err?.message || "")
      .toLowerCase()
      .includes("failed to fetch");
    const hint = needsBackend
      ? " — don’t forget to run https://github.com/dupontdenis/testMongo.git"
      : "";
    container.innerHTML = `<p class="error">Error: ${err.message}${hint}</p>`;
  }
}
