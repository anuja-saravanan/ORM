const express = require('express');
const { User } = require('./models');
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});