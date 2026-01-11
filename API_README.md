# Book Library API

A simple RESTful API for managing books built with Node.js, Express, and Mongoose.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your local machine

3. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:3000/api`

### Books

#### Get All Books
- **GET** `/books`
- Returns: Array of all books

#### Get Book by ID
- **GET** `/books/:id`
- Returns: Single book object
- Error: 404 if book not found, 400 for invalid ID format

#### Create New Book
- **POST** `/books`
- Body (JSON):
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "publishedYear": 2023,
  "rating": 4.5
}
```
- Required fields: title, author, genre, publishedYear
- Genre must be one of: Fiction, Non-Fiction, Sci-Fi, Fantasy, Biography, Other
- Rating must be between 0-5 (optional, defaults to 0)
- Error: 400 for validation errors or missing fields

#### Update Book
- **PUT** `/books/:id`
- Body (JSON): Any fields to update
- Error: 404 if book not found, 400 for validation errors

#### Delete Book
- **DELETE** `/books/:id`
- Returns: Success message
- Error: 404 if book not found, 400 for invalid ID format

## Testing with Postman

1. Import these endpoints into Postman
2. Use "Body → raw → JSON" for POST and PUT requests
3. Test all CRUD operations
4. Verify error handling with invalid inputs

## Error Responses

All errors return JSON with an error message:
```json
{
  "error": "Error message here"
}
```

Error codes:
- 400: Validation errors, missing fields, invalid ID format
- 404: Resource not found
- 500: Server errors