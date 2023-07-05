import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from 'jsonwebtoken'


export const signupController=async(req,res)=>{
try {
    const {name,email,password,phone}=req.body
    //valudate
    if(!name){
        return res.send({
            message:"Name is required"
        })
    }
    if(!email){
        return res.send({
            message:"email is required"
        })
    }
    if(!password){
        return res.send({
            message:"password is required"
        })
    }
    if(!phone){
        return res.send({
            message:"phone number is required"
        })
    }

    //check user
    const existingUser=await userModel.findOne({email})
    //existing user
    if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already registered Please login"
        })
    }
    //register user
    const hashedPassword=await hashPassword(password)
    //save
    const user = await new userModel({name,email,phone,password:hashedPassword}).save()
    const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.status(201).send({
        success:true,
        message:'User Registered successfully',
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone
        },
        token
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Signup",
        error
    })
}

}
export const loginController=async(req,res)=>{
    try {
        const email=req.body.email2
        const password=req.body.password2
        //validate
        if(!email||!password){
            return res.status(406).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        //check user
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not Registered"
            })
        }
        const match=await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        //token
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}
export const googleController=async(req,res)=>{
    try {
        const {email,name}=req.body
        const user=await userModel.findOne({email})
        if(user){
            res.status(201).send({
                success:true,
                message:'login successfully',
                user
            })
        }
        if(!user){
         new userModel({email,name}).save()
        res.status(201).send({
            success:true,
            message:'login successfully',
            user
        })}
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error",
            error
        })
    }

}
//text controller
export const testController=(req,res)=>{
    res.send('protected Route')
}