
const Sequelize = require('sequelize');
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables early in your code

const app = express();
// For Heroku
const port = process.env.PORT;
// For local
//const port = 3000;

// Using Express's built-in middleware for URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// POST route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Here, you would normally check the credentials against a database
  // For demonstration, let's just log them and return a simple response
  console.log(`Username: ${username}, Password: ${password}`);

  // TODO: Add MySQL login logic here

  // Depending on the login result, send a response
  // Assuming 'loginSuccessful' is a boolean indicating the result
  if (loginSuccessful) {
    res.send('Login successful');
  } else {
    res.send('Login failed');
  }
});

// POST route for login
app.post('/database', (req, res) => {
  const { username, password } = req.body;

  const sequelize = new Sequelize(process.env.JAWSDB_URL);

  console.log('URL is' , process.env.JAWSDB_URL);

  res.send(process.env.JAWSDB_URL);
  
});

// POST route for gptquestion
app.post('/gptquestion', (req, res) => {
  const { question } = req.body;
  console.log(`Question: ${question}`);

   const gptApiKey = process.env.API_KEY; // Use the correct environment variable name
  console.log('Api key' , gptApiKey);

  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  axios
    .post(apiUrl, {
      model: "gpt-3.5-turbo", // Replace with the desired model
      messages: [{ role: "user", content: question }],
    }, {
      headers: {
        Authorization: `Bearer ${gptApiKey}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('GPT API response:', response.data);
      if (response.data.choices && response.data.choices.length > 0 && response.data.choices[0].message) {
        const answer = response.data.choices[0].message.content;
        console.log(answer);
        res.send(answer); // Send the answer back to the client
      } else {
        res.status(500).send("No answer received from GPT API");
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error calling GPT API:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error calling GPT API, no response:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up GPT API request:', error.message);
      }
      res.status(500).send("Error in calling GPT API");
    });
});

// this is the root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the CreateAssistant!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



