import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:3000",  // Or use a specific domain here (e.g., 'http://localhost:3000')
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import ownerRouter from "./routes/owner.verification.routes.js"
import listProperty from "./routes/list.property.routes.js";
import listRoom from "./routes/list.room.routes.js";

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/owner", ownerRouter)
app.use("/api/v1/listproperty", listProperty)
app.use("/api/v1/room", listRoom)


// http://localhost:8000/api/v1/users/register

export { app }

