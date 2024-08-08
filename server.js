const express = require("express")
const morgan = require("morgan")
const cors = require("cors");
const { connect } = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const errorHandel = require("./middlewares/ErrorMiddleware")
const app = express()
dotenv.config();
connectDb();

app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(errorHandel)

// Routes
app.use("/api/v1/auth", authRoutes)

const port = process.env.PORT || 8081
app.listen(port, () => {
    console.log(`server running in ${process.env.DEV_MODE} on port ${port}`);
})