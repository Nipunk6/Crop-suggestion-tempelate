import express from 'express'
import cors from 'cors'
import healthcheckrouter from './routes/healthcheck.router.js'
import CookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middlewear.js'
import userRouter from './routes/user.routes.js'

const app =express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use("/api/v1/healthcheck",healthcheckrouter)
app.use("/api/v1/user",userRouter)
app.use(CookieParser())





app.use(errorHandler)
export {app}