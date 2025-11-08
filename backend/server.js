import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRouters.js"
import cartRouter from "./routes/cartRouters.js"
import orderRouter from "./routes/orderRouters.js"
import dotenv from "dotenv"

dotenv.config() // load .env

// app config
const app = express()
const PORT = process.env.PORT || 1303

//middleware
app.use(express.json())

// configure CORS using FRONTEND_URL (single or comma-separated list)
const rawOrigins = process.env.FRONTEND_URL || "http://localhost:5173"
const origins = rawOrigins.includes(",")
  ? rawOrigins.split(",").map(s => s.trim())
  : rawOrigins

app.use(cors({
  origin: origins,
  credentials: true
}))

// db connection
connectDB()

// routes
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// health & root endpoints
app.get("/health", (req, res) => res.sendStatus(200)) // recommended for platform health checks
app.get("/", (req, res) => { 
  res.send("API Working Perfectly")
})

// listen on the port Render assigns and bind to all interfaces
const HOST = "0.0.0.0"
app.listen(PORT, HOST, () => {
  console.log(`Server Running On http://${HOST}:${PORT}`)
})
