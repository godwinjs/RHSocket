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

let index = 0;

app.post("/message", (req, res) => {
  const { payload, type } = req.body;
  let data;

  switch (type) {
    case "SEND_MAIL":
      index= index+1;
      data = JSON.stringify({ type: "SEND_MAIL", payload });

      console.log(index+":::Sending email data to client:", data.substring(0, 15) );
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
      idx= idx+1;
      data = JSON.stringify({ type: "NEW_BOOK", payload });

      console.log(dx+":::Broadcasting database new book data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    
    case "UPDATE_BOOK":
      idx= idx+1;
      data = JSON.stringify({ type: "UPDATE_BOOK", payload });

      console.log(idx+":::Broadcasting database update book data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    
    case "DELETE_BOOK":
      idx= idx+1;
      data = JSON.stringify({ type: "DELETE_BOOK", payload });

      console.log(idx+":::Broadcasting database delete book data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;

    case "NEW_USER":
      idx= idx+1;
      data = JSON.stringify({ type: "NEW_USER", payload });

      console.log(idx+":::Broadcasting database new user data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    
    case "UPDATE_USER":
      idx= idx+1;
      data = JSON.stringify({ type: "UPDATE_USER", payload });

      console.log(idx+":::Broadcasting database update user data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    
    case "DELETE_USER":
      idx= idx+1;
      data = JSON.stringify({ type: "DELETE_USER", payload });

      console.log(idx+":::Broadcasting database delete user data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    case "NEW_AUTHOR":
      idx= idx+1;
      data = JSON.stringify({ type: "NEW_AUTHOR", payload });

      console.log(idx+":::Broadcasting database new author data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    case "UPDATE_AUTHOR":
      idx= idx+1;
      data = JSON.stringify({ id: idx,type: "UPDATE_AUTHOR", payload});

      console.log(idx+":::Broadcasting database update author data to client:", payload.name, payload.id  );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    // default:
      break;
    case "DELETE_AUTHOR":
      idx= idx+1;
      data = JSON.stringify({ type: "DELETE_AUTHOR", payload });

      console.log(idx+":::Broadcasting database delete author data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
      break;
    default:
      idx= idx+1;
      data = JSON.stringify({ type: "REFRESH", payload });

      console.log(idx+":::Broadcasting database delete author data to client:", payload.name, payload.id );
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
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