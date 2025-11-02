import { API_URL } from "../config.mjs";
import { fetchItems } from "./fetchItems.mjs";

export async function createItem() {
  const names = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ];
  const randomName =
    names[Math.floor(Math.random() * names.length)] + " " + Date.now();

  try {
    const res = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: randomName }),
    });
    const data = await res.json();

    alert(`Created: ${data.name}`);
    fetchItems();
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}
