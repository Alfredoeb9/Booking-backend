require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotel");
const roomsRoutes = require("./routes/rooms");
const usersRoutes = require("./routes/users");

// express app
const app = express();

// enable CORS
app.use(cors());

// Check if there is a body and attach to request oject
// parse incoming request
app.use(express.json());

// middleware that will fire on every request
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.path, req.method);
  next();
});

// When we fire a request to this path run the workoutRoutes
// routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/user", usersRoutes);

// connect to db
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("Listenting on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
