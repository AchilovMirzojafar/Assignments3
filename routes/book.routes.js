const express = require("express");
const router = express.Router();
const Book = require("../models/Book.model");

// GET /books - Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /books/:id - Get one book by ID
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ error: "Invalid ID format" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// POST /books - Create a new book
router.post("/books", async (req, res) => {
  try {
    const { title, author, genre, publishedYear, rating } = req.body;
    
    // Validate required fields
    if (!title || !author || !genre || publishedYear === undefined) {
      return res.status(400).json({ error: "Missing required fields: title, author, genre, publishedYear" });
    }
    
    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      rating: rating || 0
    });
    
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
      res.status(400).json({ error: "Book with this title already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// PUT /books/:id - Update a book
router.put("/books/:id", async (req, res) => {
  try {
    const { title, author, genre, publishedYear, rating } = req.body;
    
    // Validate required fields if provided
    if (title === "" || author === "" || genre === "" || publishedYear === "") {
      return res.status(400).json({ error: "Required fields cannot be empty" });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedYear, rating },
      { new: true, runValidators: true }
    );
    
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });
    res.json(updatedBook);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ error: "Invalid ID format" });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else if (error.code === 11000) {
      res.status(400).json({ error: "Book with this title already exists" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// DELETE /books/:id - Delete a book
router.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ error: "Invalid ID format" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

module.exports = router;