# search-movie-backend

Node.js Server app

This folder contains the back-end part (built in Node.js) of a Full-Stack project.

It sends a request to OMDB API to get the movie data and poster image corresponding to user's query, which is returned to the front-end.

## Available Scripts

In the project directory (/search-movie-backend), install the project:

### `npm install`

Then run the command:

### `npm start`

You should see it running in your command line terminal with a message saying:
"node src/server.js"
"Server is running"

Or open [http://localhost:4000](http://localhost:4000) to view it in your browser.

Note: The backend makes a REST API call to OMDB, which you will need an API Key for. Please ensure you have a local .env file inside the root folder, with the key/value pair OMDB_API_KEY="YOUR_OWN_KEY". The search will hang if you don't have an .env file with your API key.

### Dependencies

- node v18.18.2
- node-fetch v2.6.9
- dotenv v16.4.5
