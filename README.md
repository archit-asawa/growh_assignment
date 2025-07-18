# Basic User Registration API

A simple backend API for user registration with Node.js, Express, and JSON database.

## 🚀 Features

- ✅ User registration with username, email, and password
- ✅ Input validation (email format, password length, duplicate checking)
- ✅ Secure password hashing with bcrypt
- ✅ JSON file database storage
- ✅ RESTful API endpoints
- ✅ Success response with user ID

## 📋 API Endpoints

### POST /api/register
Register a new user

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "mypassword123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "1737259200000abc123def"
}
```

### GET /api/users
Get all registered users (passwords excluded)

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": "1737259200000abc123def",
      "username": "john_doe",
      "email": "john@example.com",
      "createdAt": "2025-01-18T12:00:00.000Z"
    }
  ]
}
```

## 🛠️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/basic-signup-api.git
cd basic-signup-api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```bash
npm start
```

4. **Server will run on:** `http://localhost:3000`

## 📝 Testing

### Using Postman:
1. **POST** `http://localhost:3000/api/register`
2. **Headers:** `Content-Type: application/json`
3. **Body:** 
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Using cURL:
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📊 Validation Rules

- **Username:** 3-20 characters
- **Email:** Valid email format
- **Password:** Minimum 8 characters
- **Duplicates:** No duplicate usernames or emails allowed

## 🗂️ Database Structure

Users are stored in `users.json`:
```json
[
  {
    "id": "unique_id",
    "username": "username",
    "email": "email@example.com",
    "password": "hashed_password",
    "createdAt": "2025-01-18T12:00:00.000Z"
  }
]
```

## 🔧 Dependencies

- **express**: Web framework
- **bcryptjs**: Password hashing
- **validator**: Email validation

## 📁 Project Structure

```
basic-signup-api/
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── users.json          # JSON database file
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## 🎯 Assignment Requirements Met

✅ Accept POST request with JSON body (username, email, password)
✅ Validate input (email format, password length, duplicates)
✅ Hash password securely
✅ Save user to JSON database
✅ Return success response with user ID

## 🚀 Live Demo

The API accepts user registration and stores data in a JSON file. All passwords are securely hashed before storage.

## 👨‍💻 Author

Created as part of a backend development assignment.

## 📄 License

MIT License
