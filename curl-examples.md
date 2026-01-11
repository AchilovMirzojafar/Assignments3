# API Testing Examples

## Using curl commands to test the API

### 1. Create a new book
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "publishedYear": 1937,
    "rating": 4.8
  }'
```

### 2. Get all books
```bash
curl http://localhost:3000/api/books
```

### 3. Get a specific book (replace BOOK_ID with actual ID)
```bash
curl http://localhost:3000/api/books/BOOK_ID
```

### 4. Update a book
```bash
curl -X PUT http://localhost:3000/api/books/BOOK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4.9
  }'
```

### 5. Delete a book
```bash
curl -X DELETE http://localhost:3000/api/books/BOOK_ID
```

### Test Error Cases

#### Invalid ID format
```bash
curl http://localhost:3000/api/books/invalid-id
```

#### Missing required fields
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Incomplete Book"
  }'
```

#### Invalid genre
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "genre": "InvalidGenre",
    "publishedYear": 2023
  }'
```

#### Rating out of range
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "genre": "Fiction",
    "publishedYear": 2023,
    "rating": 6
  }'
```