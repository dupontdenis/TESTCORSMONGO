# TESTCORSMONGO – Frontend to test a MongoDB API

This tiny web app is a simple frontend to exercise a REST API backed by MongoDB. It’s meant to be used with the backend from:

- Backend repo: https://github.com/dupontdenis/testMongo

The UI lets you:

- Load items (GET /items)
- Create a random item (POST /items)
- Check API health (GET /health)
- Reset the DB (deletes all items)

## Project structure

```
.
├─ index.html          # Minimal page loading the app as ES modules
├─ styles.css          # Basic styling
├─ config.mjs          # API base URL configuration (API_URL)
├─ main.mjs            # Orchestrator: wires buttons to actions, loads items on start
└─ utils/              # Each action isolated in its own module
   ├─ fetchItems.mjs   # GET /items → render list
   ├─ createItem.mjs   # POST /items → create random item
   ├─ checkHealth.mjs  # GET /health → show status
   └─ resetDB.mjs      # Flush DB by deleting all items
```

## Prerequisites

- Node.js 18+ or Python 3 (for a static file server)
- A running backend API (see backend repo above)
- CORS enabled on the backend (the backend repo provides permissive CORS for local dev)

## Configure the API URL

Set the API base URL in `config.mjs`:

```js
// config.mjs
export const API_URL = "http://localhost:3000"; // adjust if your backend runs elsewhere
```

## Run the frontend locally

Serve these static files with any simple server. Examples:

- Using Live Server
``` html
Open with Live Server extension
```

- Using Node (npx):

```bash
npx http-server -p 3000
```
ou 

```bash
npx serve .
```

- Using Python 3:

```bash
python -m http.server 8080
```

Then open the printed URL in your browser (for python example: http://localhost:8080).

## Expected API endpoints

The frontend expects the following REST endpoints from the backend:

- GET `/items` → returns an array of items: `{ _id, name, createdAt }`
- POST `/items` with JSON `{ name }` → creates and returns an item
- GET `/health` → returns basic health info `{ app, db, details? }`
- DELETE `/items/:id` → deletes a single item by id

Reset action behavior:

- The Reset button fetches all items via `GET /items` and then calls `DELETE /items/:id` for each one.
- There is no hardcoded `/reset` endpoint; deleting one-by-one avoids needing a special route.

## Troubleshooting

- CORS error in the browser console: ensure the backend has CORS enabled and that API_URL matches the backend origin (protocol + host + port).
- Network error or 404: verify the backend is running and the endpoints above exist. The backend repo contains a working Express server with these routes.
- Items don’t appear after creating: check the browser console for errors and the backend logs for request handling.

## Notes

- This project uses native ES modules (`type="module"`) and no build step.
- You can customize UI styles in `styles.css`.
- If you host frontend and backend on different origins in production, configure proper CORS and HTTPS.
