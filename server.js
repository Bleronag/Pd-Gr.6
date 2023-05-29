const net = require('net');

const clients = [];

// Create a TCP server
const server = net.createServer(client => {
  // Add the connected client to the clients array
  clients.push(client);

  // Handle incoming data from clients
  client.on('data', data => {
    // Process the data received from the client
    const message = data.toString().trim();

    // Broadcast the message to all connected clients
    clients.forEach(c => {
      if (c !== client) {
        c.write(`${client.remoteAddress}:${client.remotePort} - ${message}\n`);
      }
    });

    // Send a response back to the client
    client.write(`Server received your message: ${message}\n`);
  });

  // Handle client disconnection
  client.on('end', () => {
    // Remove the disconnected client from the clients array
    const index = clients.indexOf(client);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });

  // Handle client errors
  client.on('error', err => {
    console.error('Client error:', err);
  });
});

// Start the server and listen on a specific port
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
