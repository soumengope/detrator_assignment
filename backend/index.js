const express = require('express');
const mysql = require('mysql2');
const http = require('http');

const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1122',
  database: 'comments_system',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

io.on('connection', (socket) => {
  console.log('someone is connected');
  socket.on('disconnect', () => {
    console.log('someone is disconnected');
  });
});

app.post('/api/login', (req, res) => {
    const { username } = req.body;
    const sessionId = Math.random().toString(36).substring(2);
    res.json({ sessionId });
  });
  
  app.get('/api/comments', (req, res) => {
    db.query('SELECT * FROM comments ORDER BY timestamp DESC', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  app.post('/api/comments', (req, res) => {
    const { username, comment } = req.body;
    const query = 'INSERT INTO comments (username, comment) VALUES (?, ?)';
    db.query(query, [username, comment], (err, result) => {
      if (err) throw err;
      io.emit('newComment', { username, comment, timestamp: new Date() });
      res.json({ id: result.insertId });
    });
  });

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
