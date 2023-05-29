const net = require('net');
const readline = require('readline');

// Create a TCP client
const client = net.connect({ port: 3000 }, () => {
  console.log('Connected to server');

  // Create a readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let username;

  // Prompt the user for a username
  rl.question('Enter your username: ', answer => {
    username = answer;

    // Handle user input
    rl.on('line', input => {
      // Send the input as a message to the server
      client.write(`${username}: ${input}`);
    });
  });
});

// Handle server responses
client.on('data', data => {
  console.log(data.toString());
});

// Handle client errors
client.on('error', err => {
  console.error('Server error:', err);
});

// Handle client disconnection
client.on('end', () => {
  console.log('Connection to server closed');
});
