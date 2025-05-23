// routes/schools.js

const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Add School API
router.post("/addSchool", (req, res) => {
  console.log(req.body);
  const { name, address, latitude, longitude } = req.body;

  // Validate input data
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err.message);
      return res.status(500).json({ message: "Error adding school" });
    }

    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  });
});

// List Schools API with distance sorting
router.get("/listSchools", (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and Longitude are required" });
  }

  const latitudeNum = parseFloat(latitude);
  const longitudeNum = parseFloat(longitude);

  if (isNaN(latitudeNum) || isNaN(longitudeNum)) {
    return res.status(400).json({ message: "Invalid latitude or longitude" });
  }

  const query = "SELECT * FROM schools";
  db.query(query, (err, schools) => {
    if (err) {
      console.error("Error fetching schools:", err.message);
      return res.status(500).json({ message: "Error fetching schools" });
    }

    // Haversine formula to calculate distance between two lat/lon points
    const haversine = (lat1, lon1, lat2, lon2) => {
      const toRad = (deg) => deg * (Math.PI / 180);
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    };

    // Add distance to each school and sort by proximity
    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: haversine(
          latitudeNum,
          longitudeNum,
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json({ schools: sortedSchools });
  });
});

module.exports = router;
