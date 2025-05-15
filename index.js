// ws-server/index.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
  });
});

app.post("/message", (req, res) => {
  const { payload, type } = req.body;
  let data;

  switch (type) {
    case "SEND_MAIL":
      data = JSON.stringify({ type: "SEND_MAIL", payload });

      console.log("Sending email data to client:", data.substring(0, 15) );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    // default:
      break;
  }

  // clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     client.send(data);
  //   }
  // });

  res.json({ success: true });
});

let idx = 0;

app.post("/data", (req, res) => {
  const { payload, type } = req.body;
  // console.log({payload, type})
  // const data = JSON.stringify({ type: "NEW_AUTHOR", payload: user });
  let data;

  switch (type) {
    
    case "NEW_BOOK":
      data = JSON.stringify({ type: "NEW_BOOK", payload });

      console.log("Broadcasting database new book data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    
    case "UPDATE_BOOK":
      data = JSON.stringify({ type: "UPDATE_BOOK", payload });

      console.log("Broadcasting database update book data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    case "NEW_USER":
      data = JSON.stringify({ type: "NEW_USER", payload });

      console.log("Broadcasting database new user data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    
    case "UPDATE_USER":
      data = JSON.stringify({ type: "UPDATE_USER", payload });

      console.log("Broadcasting database update user data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    case "NEW_AUTHOR":
      data = JSON.stringify({ type: "NEW_AUTHOR", payload });

      console.log("Broadcasting database new author date to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    case "UPDATE_AUTHOR":
      idx= idx+1;
      data = JSON.stringify({ id: idx,type: "UPDATE_AUTHOR", payload});

      console.log("Broadcasting database update author data to client:", payload.name, payload.id  );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    // default:
      break;
  }

  // clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN) {
  //     client.send(data);
  //   }
  // });

  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`WebSocket server running on port ${PORT}`))