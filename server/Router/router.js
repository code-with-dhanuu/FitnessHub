import express from "express"
import UserRoutes from "../routes/user_routes.js"


const Allroutes = express.Router()

Allroutes.use("/userroutes" , UserRoutes)

export default Allroutes