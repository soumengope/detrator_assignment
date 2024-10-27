"use client";
import React, { useState, useEffect } from 'react';
import { Container,TextField,List, ListItem,ListItemText,Button,Box} from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Page = () => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:5000/api/comments').then(response => {
      setComments(response.data);
    });

    socket.on('newComment', (newComment) => {
      setComments(prev => [newComment, ...prev]);
    });

    return () => {
      socket.off('newComment');
    };
  }, []);

  const handleLogin = () => {
    axios.post('http://localhost:5000/api/login', { username }).then(response => {
      setSessionId(response.data.sessionId);
    });
  };

  const handleSubmitComment = () => {
    if (!sessionId) return;
    
    axios.post('http://localhost:5000/api/comments', { username, comment }).then(() => {
      setComment('');
    });
  };

  return (
    <Container>
      {!sessionId ? (
        <div>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button className="btn" variant="contained" onClick={handleLogin}>Login</Button>
          </Box>
        </div>
      ) : (
        <div>
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleSubmitComment}>Send Comment</Button>
          </Box>
          <List>
            {comments.map((c, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${c.username}: ${c.comment}`}
                  secondary={new Date(c.timestamp).toLocaleString()}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
};

export default Page;