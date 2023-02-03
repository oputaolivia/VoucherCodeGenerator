const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const { userRoute } = require("./routes/userRoute.js");

app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
