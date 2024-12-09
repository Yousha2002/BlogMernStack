const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Load environment variables
dotenv.config();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Ensure that the 'images' directory exists
const imagesDir = path.join(__dirname, "/images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Serve static images
app.use("/images", express.static(imagesDir));

// Database connection (no deprecated options)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

// Routes middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// // Deployment
// app.use(express.static(path.join(__dirname, "../Frontend/BlogMernStack/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(
//     path.resolve(__dirname, "..Frontend/BlogMernStack/dist", "index.html")
//   );
// });

// Multer storage setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    const filename =
      req.body.img || Date.now() + path.extname(file.originalname);
    fn(null, filename);
  },
});

const upload = multer({ storage: storage });

// Image upload endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file uploaded!");
  }
  res.status(200).json("Image has been uploaded successfully!");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started on port ${PORT}`);
});
