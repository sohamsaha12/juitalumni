const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY;
const mongourl = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import models
const User = require('./models/User');

// Routes
const posts = require('./routes/posts');
const blogs = require('./routes/blogs');
const users = require('./routes/users');

app.use('/api/posts', posts);
app.use('/api/blogs', blogs);
app.use('/api/users', users);

app.post('/register', async (req, res) => {
  const { name, email, password, rollNumber, passoutBatch, contactNumber } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      rollNumber,
      passoutBatch,
      contactNumber,
      pending: true,
      role: 'user'
    });
    await user.save();
    res.status(201).send({ message: 'Registration successful. Awaiting approval.' });
  } catch (error) {
    res.status(400).send({ message: 'Error registering user', error });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    if (user.pending) {
      return res.status(403).send({ message: 'Account pending approval' });
    }
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
});

app.get('/profile', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const user = jwt.verify(token, SECRET_KEY);
    res.send(user);
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));