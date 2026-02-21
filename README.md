# JSBasics

A browser-only Album DB app for the JS basics assignments. It fetches albums and photos from [JSONPlaceholder](https://jsonplaceholder.typicode.com), groups them by album, and caches data in `localStorage`.

## How to run

Open `album/index.html` in a browser. No build or server is required. If you need to avoid file:// CORS issues, serve the `album` folder with any static HTTP server.

## Requirements

See [Instructions.txt](Instructions.txt) for Assignment 1 and Assignment 2.

## Structure

- `album/index.html` — Main entry point
- `album/datapopulate.js` — Data fetch, storage, and UI logic
- `album/styles.css` — Layout and modal styles
- `album/jquery.min.js` — Local jQuery
- `album/album.html` — Alternate UI (uses same script)

## Tech

HTML, CSS, JavaScript, jQuery, Materialize (CDN). Data from JSONPlaceholder; persistence in `localStorage`.
