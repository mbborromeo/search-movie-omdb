# search-movie-assignment

REST API call to OMDB

This assignment/project lets user's search for a movie by title. It sends a request to OMDB API to get the movie data and poster image.

This is a Full-Stack project, so there is a client folder and server folder:

- search-movie-ui (built in React)
- search-movie-backend (built in Node.js)

You need to run `npm install` and `npm start` from inside both folders.
There are README.md files in both folders for more detail.

Note: The backend makes a REST API call to OMDB, which you will need an API Key for. Please ensure you have a local .env file inside the /search-movie-backend folder, with the key/value pair OMDB_API_KEY="YOUR_OWN_KEY". The search will hang if you don't have an .env file with your API key.

## Features Done

- Connect to API to fetch live data from OMDB
- Improved presentation layer of searched movie
- Mobile-responsive layout
- SASS for styling
- Reusable React component for list elements
- Basic GIF loading image
- Fields won't display if no corresponding data returned from API call
- Submit button won't send if user's input was same as last search
- Utilities file for helper functions
- User's input trimmed and space characters converted to '+' before sending to API call
- Number of IMDB votes formatted
- Dotenv/process.env file on Node.js to store API key

## Dependencies

- react v18.2.0
- react-dom v18.2.0
- react-scripts v5.0.1
- sass v1.79.3
- node v18.18.2
- node-fetch v2.6.9
- dotenv v16.4.5

### Author

Michael Borromeo and Relayfy
