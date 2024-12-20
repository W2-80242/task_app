const express = require('express');
const supabase = require('../supabaseClient'); // Import the Supabase client

const app = express();

// Get all users with pagination
app.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    // Query users table in Supabase
    const { data, error, count } = await supabase
      .from('users') // Your table name in Supabase
      .select('*', { count: 'exact' }) // Get all fields and count total rows
      .range(offset, offset + perPage - 1); // Pagination

    if (error) {
      return res.status(400).json({ status: 'error', error: error.message });
    }

    const totalPages = Math.ceil(count / perPage);

    const reply = {
      status: 'success',
      result: data,
      pagination: {
        page,
        perPage,
        total: count,
        totalPages
      }
    };

    res.setHeader('Content-type', 'application/json');
    res.json(reply);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Get a specific user by ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('users') // Your table name in Supabase
      .select('first_name, last_name, email') // Select columns you need
      .eq('id', userId) // Filter by user ID
      .single(); // Only one row expected

    if (error) {
      return res.status(400).json({ status: 'error', error: error.message });
    }

    if (data) {
      res.json({
        status: 'success',
        result: data
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Add a new user
app.post('/users/add', async (req, res) => {
    try {
      const { first_name, last_name, phone_no, role, email } = req.body;
  
      // Input validation
      if (!first_name || !last_name || !role || !email) {
        return res.status(400).json({
          status: 'error',
          message: 'Required fields are missing: first_name, last_name, role, email',
        });
      }
  
      // Insert new user into Supabase and explicitly return the inserted data
      const { data, error } = await supabase
        .from('users') // Your table name in Supabase
        .insert([
          {
            first_name,
            last_name,
            phone_no,
            role,
            email,
          },
        ])
        .select(); // Explicitly return the inserted rows
  
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to create user',
          error: error.message,
        });
      }
  
      // If no data is returned, handle it
      if (!data || data.length === 0) {
        return res.status(500).json({
          status: 'error',
          message: 'User creation failed, no data returned from Supabase',
        });
      }
  
      // Success response
      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user: data[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred',
        error: error.message,
      });
    }
  });
  
  

module.exports = app;