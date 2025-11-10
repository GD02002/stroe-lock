const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Node.js app is running on Railway!");
});

// Example API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Railway API!" });
});

// Dynamic Port for Railway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
