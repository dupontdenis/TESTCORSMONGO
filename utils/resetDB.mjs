import { API_URL } from "../config.mjs";
import { fetchItems } from "./fetchItems.mjs";

export async function resetDB() {
  const confirmReset = window.confirm(
    "This will delete all items in the database. Continue?"
  );
  if (!confirmReset) return;

  try {
    // First, fetch all items to get their IDs
    const res = await fetch(`${API_URL}/items`);
    const items = await res.json();

    if (items.error) {
      throw new Error(items.error);
    }

    if (items.length === 0) {
      alert("Database is already empty.");
      return;
    }

    // Delete each item individually
    let deleted = 0;
    for (const item of items) {
      const delRes = await fetch(`${API_URL}/items/${item._id}`, {
        method: "DELETE",
      });
      if (delRes.ok) deleted++;
    }

    alert(`Database reset successful. Deleted ${deleted} item(s).`);
    fetchItems();
  } catch (err) {
    alert(`Reset failed: ${err.message}`);
  }
}
