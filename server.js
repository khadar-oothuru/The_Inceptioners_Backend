require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const packageRoutes = require("./routes/packages.js");
const bookingRoutes = require("./routes/bookings.js");
const adminRoutes = require("./routes/admin");

connectDB();
const app = express();
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
