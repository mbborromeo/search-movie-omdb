# search-movie-assignment

REST API call to OMDB

This is a Full-Stack project, so there is a client folder and server folder:

- search-movie-ui (built in React)
- search-movie-backend (built in Node.js)

You need to run `npm install` and `npm start` from inside both folders.
There are README.md files in both folders for more detail.

Note: The backend makes a REST API call to OMDB, which you will need an API Key for. Please ensure you have a local .env file inside the /search-movie-backend folder, with the key/value pair OMDB_API_KEY="YOUR_OWN_KEY". The search will hang if you don't have an .env file with your API key.
