// frontend/src/components/Search.js

import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/items?search=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or tag"
        />
        <button type="submit">Search</button>
      </form>
      {results.map((item) => (
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

export default Search;
