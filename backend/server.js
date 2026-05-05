require("dotenv").config();\nconst express = require("express");\nconst cors = require("cors");\nconst db = require("./config/db");\n\nconst app = express();\n\n// Middleware\napp.use(cors({\n  origin: "http://localhost:3000",\n  credentials: true\n}));\napp.use(express.json({ limit: "10mb" }));\napp.use(express.urlencoded({ extended: true, limit: "10mb" })); // Add for forms

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend working...");
});

// 🔥 TEST API (IMPORTANT - temporary)

// ✅ Feature routes (real routes)
const featureRoutes = require("./routers/featureRoutes");
app.use("/api/features", featureRoutes);

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Server error" });
});

// Start server\nconst PORT = process.env.PORT || 5000;\n\napp.listen(PORT, () => {\n  console.log(`✅ Server running on http://localhost:${PORT}`);\n});
