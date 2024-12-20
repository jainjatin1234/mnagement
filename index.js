import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
const cors = require('cors')

dotenv.config(
  {
      path:'.env'
  }
)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express();

// Allow requests from localhost:5173


// Alternatively, allow all origins (not recommended for production)
app.use(cors());



// to make input as json
app.use(express.json())
app.use(cookieParser())


app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000")
})

// import routes
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Serer Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
