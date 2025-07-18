const express = require('express');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_PATH = path.join(__dirname, 'users.json');

async function initializeDatabase() {
  try {
    await fs.access(DB_PATH);
  } catch (error) {
    await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
    console.log('Database file created: users.json');
  }
}

async function readUsers() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

function generateUserId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function validateInput(username, email, password) {
  const errors = [];

  if (!username || username.length < 3 || username.length > 20) {
    errors.push('Username must be between 3 and 20 characters');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Invalid email format');
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  return errors;
}

async function checkDuplicateUser(username, email) {
  const users = await readUsers();
  const duplicateUsername = users.find(user => user.username === username);
  const duplicateEmail = users.find(user => user.email === email);

  const errors = [];
  if (duplicateUsername) {
    errors.push('Username already exists');
  }
  if (duplicateEmail) {
    errors.push('Email already exists');
  }

  return errors;
}

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const validationErrors = validateInput(username, email, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const duplicateErrors = await checkDuplicateUser(username, email);
    if (duplicateErrors.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
        errors: duplicateErrors
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateUserId();

    const newUser = {
      id: userId,
      username: username,
      email: email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    const users = await readUsers();
    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: userId
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await readUsers();
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    
    res.json({
      success: true,
      users: usersWithoutPasswords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`POST http://localhost:${PORT}/api/register - Register user`);
    console.log(`GET http://localhost:${PORT}/api/users - View all users`);
  });
}

startServer();
