// backend/routes/items.js

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
// backend/routes/items.js

// ... previous code ...

// Get all items (with optional search)
router.get('/', async (req, res) => {
    try {
      let items;
      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        items = await Item.find({
          $or: [{ name: searchRegex }, { tags: searchRegex }],
        });
      } else {
        items = await Item.find();
      }
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // ... rest of the code ...
  

// Create a new item
router.post('/', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    type: req.body.type,
    tags: req.body.tags,
    content: req.body.content,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single item
router.get('/:id', getItem, (req, res) => {
  res.json(res.item);
});

// Update an item
router.put('/:id', getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.type != null) {
    res.item.type = req.body.type;
  }
  if (req.body.tags != null) {
    res.item.tags = req.body.tags;
  }
  if (req.body.content != null) {
    res.item.content = req.body.content;
  }

  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', getItem, async (req, res) => {
  try {
    await res.item.remove();
    res.json({ message: 'Deleted Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get item by ID
async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Cannot find item' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.item = item;
  next();
}

module.exports = router;
