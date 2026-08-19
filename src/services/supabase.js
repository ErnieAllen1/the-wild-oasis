import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

export const supabaseUrl = "https://kuixddnrtsqwrgwbmuny.supabase.co/";
const supabase = createClient(
  "https://kuixddnrtsqwrgwbmuny.supabase.co/",
  "sb_publishable_-fYaQkt0OGiFckWrusRnNg_vWTq0A9W",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aXhkZG5ydHNxd3Jnd2JtdW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3ODgzODUsImV4cCI6MjEwMDM2NDM4NX0.q1Mzvt80b7lLLuMpzmAzWfx9e2yjjmiBTjFDGcpkyNA",
);

export default supabase;
