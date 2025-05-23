// server.js
const express = require("express");
const helmet = require("helmet");
const schoolsRouter = require("./routes/schools"); // Adjust path if needed

const app = express();

// Use helmet to set secure HTTP headers including CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],  // allow Google Fonts
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // allow inline styles and Google Fonts CSS
      scriptSrc: ["'self'", "'unsafe-inline'"],  // allow inline scripts (less secure but easy for dev)
      imgSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  })
);

// Parse JSON bodies
app.use(express.json());

// Serve static files from public folder
app.use(express.static("public"));

// Mount schools routes under /api/schools
app.use("/", schoolsRouter);

// Simple root route
app.get("/", (req, res) => {
  res.send("Welcome to the School Management API");
});



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
