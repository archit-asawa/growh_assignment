Request body
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

