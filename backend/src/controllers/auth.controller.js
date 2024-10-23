import prisma from "../prisma.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";

export const signup = async(req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            throw new Error("All fields are required");
        }
        const existingUser = await prisma.user.findFirst({where: {email}});
        if(existingUser){ return res.status(400).json({succes: false, message: "User already exists"}); }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                verificationToken,
                verificationTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000)
            }
        });
        generateTokenAndSetCookies(res, user.user_id);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({succes: false, message: error.message});
    }
}

export const login = async(req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await prisma.usuario.findUnique({where : {correo_ucol: email,}});
        if(!user){ res.status.json({succes: false, message:"Invalid credentials"}); }
        
        const isPasswordValid = await bcryptjs.compare(password, user.contrasena);
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        const userRole = user.rol;

        generateTokenAndSetCookie(res, user.user_id);

        res.status(200).json({success: true, message: "Logged in successfully"});
    } catch (error) {
        console.log("Error in login",error);
        res.status(400).json({succes: false, message: error.message});
    }
}

export const logout = async (req, res)=>{
    res.clearCookie("token");
    res.status(200).json({succes: true, message: "Logged out successfully"});
}

export const checkAuth = async (req, res) =>{
    try {
     const user = await prisma.usuario.findUnique({
       where: {
         id_usuario: req.user_id,
       },
       select: {
         password: false,
         id_usuario: true,
         nombre_usuario: true,
         rol: true
       },
     });
     if(!user) return res.status(400).json({succes: false, message: "User not found"});
   
     res.status(200).json({succes: true, user})
    } catch (error) {
     console.log("Error in CheckAuth", error);
     res.status(400).json({succes:false, message:error.message});
    } 
}