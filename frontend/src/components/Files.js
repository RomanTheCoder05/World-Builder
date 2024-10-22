// frontend/src/components/Files.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Files() {
  // State variables
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    type: '',
    tags: '',
    content: '',
  });

  // Fetch items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch items from the backend
  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/items');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  // Handle input changes in the form
  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Handle form submission to add a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/items', {
        ...newItem,
        tags: newItem.tags.split(',').map((tag) => tag.trim()),
      });
      setItems([...items, res.data]);
      setNewItem({ name: '', type: '', tags: '', content: '' });
    } catch (err) {
      console.error(err);
    }
  };
  

  // Return statement rendering your JSX
  return (
    <div>
      <h1>Files</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="type"
          value={newItem.type}
          onChange={handleInputChange}
          placeholder="Type"
          required
        />
        <input
          type="text"
          name="tags"
          value={newItem.tags}
          onChange={handleInputChange}
          placeholder="Tags (comma separated)"
        />
        <textarea
          name="content"
          value={newItem.content}
          onChange={handleInputChange}
          placeholder="Content"
        ></textarea>
        <button type="submit">Add Item</button>
      </form>
      {items.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <p>Type: {item.type}</p>
          <p>Tags: {item.tags.join(', ')}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Files;
