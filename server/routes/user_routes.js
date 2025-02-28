import express from "express";
import {upload} from "../File_upload/Multerfile.js"
import {Deleteuser, GetAllUser, Updateuser, UserLogin, Userregistration } from "../controller/usercontroller.js";


const UserRoutes = express.Router()

//  http://localhost:4000/api/userroutes/create 

UserRoutes.post("/create" , upload.single("img") , Userregistration)

UserRoutes.post("/login" ,UserLogin)

UserRoutes.put("/updateprofile" ,upload.single("img"), Updateuser )

UserRoutes.get("/alluser" , GetAllUser)

UserRoutes.delete("/deleteuser/:id" , Deleteuser)
export default UserRoutes