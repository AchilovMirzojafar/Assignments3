const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
const MONGODB_URI = "mongodb://127.0.0.1:27017/book-library";

mongoose
  .connect(MONGODB_URI)
  .then(x => console.log(`Connected to MongoDB: ${x.connection.name}`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// Import routes
const bookRoutes = require("./routes/book.routes");

// Use routes
app.use("/api", bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;