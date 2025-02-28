import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Uploadoncloudinary from "../File_upload/Cloudnaryfile.js";
import {v2 as cloudinary} from "cloudinary"


export const Userregistration = async(req , res)=>{
    console.log("this is file", req.file.path)

const imgurl = await Uploadoncloudinary(req.file.path)

const user_id = "id" + Math.floor((Math.random()*1000000))
const {firstname,lastname, username, mobileNo, email , city , state , pincode , password, role } = req.body
if (!user_id ||!firstname|| !lastname|| !username || !mobileNo || !email || !role || !password) {
   return res.json({ msg: "Plase fill all fields" })
}

  const existingUser = await User.findOne({ email });
  if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

try {
    const userdata = await User.create({
        "user_id": user_id,
        "firstname":firstname,
        "lastname":lastname,
        "username": username,
        "email": email,
        "mobileNo": mobileNo,
        "password": hashedPassword,
        "city":city,
        "state":state,
        "pincode":pincode,
        "role": role,
        "img":imgurl
    })
    res.status(200).json({
        success: true,
        msg: "Registration Successful",
        data: userdata,

    })
}
catch (e) {
    console.error(e);
    res.send(e)
}
}



export const UserLogin = async (req, res) => {

    console.log("Request Body:", req.body);
    const { email, password } = req.body;

    //  Ensure email & password are provided
    if (!email || !password) {
        return res.status(400).json({ msg: "Please fill all feilds" });
    }

    try {
        //  Find user by email
        const userlogin = await User.findOne({ email });

        if (!userlogin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //  Compare hashed password
        const isMatch = await bcrypt.compare(password, userlogin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }  
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", userlogin.password);

        return res.status(200).json({
            success: true,
            data: userlogin,
            msg: `${email} login successfully`
        });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};



export const Updateuser = async(req , res)=>{
    console.log("this is file", req.file.path)

    const imgurl = await Uploadoncloudinary(req.file.path)

    const {user_id,firstname,lastname, username, mobileNo, email , city , state , pincode , password, role} = req.body;
    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    // 🔹 Find user in DB
    const user = await User.findOne({ user_id: user_id });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    let hashedPassword = user.password; // Default to existing password
    if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }
    try{
const edit = await User.updateOne({user_id:user_id},{
    $set:{
        firstname:firstname,
        lastname:lastname,
        username:username,
        mobileNo:mobileNo,
        email:email,
        city:city,
        state:state,
        pincode:pincode,
        password:hashedPassword,
        role:role,
        img:imgurl
    }
})
res.json({
    success:true,
    data:edit,
    msg:`${username} profile was updated`
})
   }catch(e){
        return res.status(500).json({error:e.message})
       
    }
}


export const GetAllUser = async(req , res)=>{
    const alluser = await User.find()
    res.json({
        success:true,
        msg:"Fetch All Users",
        data:alluser
    })
}


export const Deleteuser = async (req,res)=>{
    const  {id} =req.params;
    
    try{
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }
        console.log(user)

        const imageUrl = user.img;

        const publicId = imageUrl.split('/').pop().split('.')[0]; // Extract ID from URL
        console.log(publicId)

        const deleteImage = await cloudinary.uploader.destroy(publicId);  
        console.log(deleteImage)

        if (deleteImage.result !== 'ok') {
            return res.status(500).json({
                msg: "Error deleting image from Cloudinary",
                error: deleteImage
            });
        }

        const deleteuser = await User.deleteOne({ _id: id });
        res.json({
            success:true,
            data: deleteuser,
            msg: "user deleted successfully"
        });
    }
    catch(e){
        console.log(e)
    }
}