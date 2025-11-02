import { API_URL } from "../config.mjs";
import { fetchItems } from "./fetchItems.mjs";

export async function createItem() {
  const names = [
    "Margherita",
    "Pepperoni",
    "Quattro Formaggi",
    "Napolitana",
    "Calzone",
    "Diavola",
    "Capricciosa",
    "Marinara",
    "Funghi",
    "Prosciutto",
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

    // alert(`Created: ${data.name}`);
    fetchItems();
  } catch (err) {
    const needsBackend = (err?.message || "")
      .toLowerCase()
      .includes("failed to fetch");
    const hint = needsBackend
      ? "\nDon’t forget to run https://github.com/dupontdenis/testMongo.git"
      : "";
    alert(`Error: ${err.message}${hint}`);
  }
}
