const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  'https://qzabbtuywrgkstyjckin.supabase.co', // Replace with your Supabase project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YWJidHV5d3Jna3N0eWpja2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzEyMTgsImV4cCI6MjA1MDIwNzIxOH0.tzhSWEMfSxy91u5KgiknHk_T-AEEksKulq4oVsZiCfU'  // Replace with your Supabase public API key
);

module.exports = supabase;
