// Simple test script to verify API endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  try {
    console.log('Testing Book Library API...\n');
    
    // Test 1: Create a new book
    console.log('1. Creating a new book...');
    const newBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      publishedYear: 1925,
      rating: 4.5
    };
    
    const createResponse = await axios.post(`${BASE_URL}/books`, newBook);
    console.log('✅ Book created:', createResponse.data);
    const bookId = createResponse.data._id;
    
    // Test 2: Get all books
    console.log('\n2. Getting all books...');
    const getAllResponse = await axios.get(`${BASE_URL}/books`);
    console.log('✅ All books:', getAllResponse.data);
    
    // Test 3: Get one book by ID
    console.log('\n3. Getting book by ID...');
    const getOneResponse = await axios.get(`${BASE_URL}/books/${bookId}`);
    console.log('✅ Single book:', getOneResponse.data);
    
    // Test 4: Update the book
    console.log('\n4. Updating book...');
    const updateData = { rating: 4.8 };
    const updateResponse = await axios.put(`${BASE_URL}/books/${bookId}`, updateData);
    console.log('✅ Updated book:', updateResponse.data);
    
    // Test 5: Test error handling - invalid ID format
    console.log('\n5. Testing error handling - invalid ID format...');
    try {
      await axios.get(`${BASE_URL}/books/invalid-id`);
    } catch (error) {
      console.log('✅ Error handled correctly:', error.response.data);
    }
    
    // Test 6: Test validation - missing required fields
    console.log('\n6. Testing validation - missing required fields...');
    try {
      await axios.post(`${BASE_URL}/books`, { title: "Test Book" });
    } catch (error) {
      console.log('✅ Validation error handled:', error.response.data);
    }
    
    // Test 7: Delete the book
    console.log('\n7. Deleting book...');
    const deleteResponse = await axios.delete(`${BASE_URL}/books/${bookId}`);
    console.log('✅ Book deleted:', deleteResponse.data);
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response ? error.response.data : error.message);
  }
}

// Only run if axios is available
try {
  require('axios');
  testAPI();
} catch (error) {
  console.log('Axios not available. Install with: npm install axios');
  console.log('Then run: node test-api.js');
}