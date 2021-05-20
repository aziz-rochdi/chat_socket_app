const webSocket = require("ws");
const SocketServer = require("ws").Server;
const express = require("express");
const server = express().listen(3000);
const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
  console.log("[server] a client was connected ");
  ws.on("close", () => {
    console.log("[server] client desconnected ");
  });
  ws.on("message", (message) => {
    console.log("[server] receiced message %s", message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === webSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
