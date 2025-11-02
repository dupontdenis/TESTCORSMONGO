import { fetchItems } from "./utils/fetchItems.mjs";
import { createItem } from "./utils/createItem.mjs";
import { checkHealth } from "./utils/checkHealth.mjs";
import { resetDB } from "./utils/resetDB.mjs";

// Expose functions to window for onclick handlers
window.fetchItems = fetchItems;
window.createItem = createItem;
window.checkHealth = checkHealth;
window.resetDB = resetDB;

// Load items on page load
fetchItems();
