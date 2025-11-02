import { API_URL } from "../config.mjs";

export async function fetchItems() {
  const container = document.getElementById("items");
  container.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${API_URL}/items`);
    const data = await res.json();

    if (data.error) {
      container.innerHTML = `<p class="error">Error: ${data.error}</p>`;
      return;
    }

    if (data.length === 0) {
      container.innerHTML = "<p>No items yet. Create one!</p>";
      return;
    }

    container.innerHTML =
      "<h2>Items:</h2>" +
      data
        .map(
          (item) => `
            <div class="item">
              <strong>${item.name}</strong><br>
              <small>ID: ${item._id}</small><br>
              <small>Created: ${new Date(
                item.createdAt
              ).toLocaleString()}</small>
            </div>
          `
        )
        .join("");
  } catch (err) {
    container.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  }
}
