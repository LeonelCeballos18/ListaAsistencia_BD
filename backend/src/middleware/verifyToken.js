import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({succes: false, message: "Unauthorized"}) //no token provided
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(401).json({succes: false, message: "Unauthorized"}) //Invalid token

        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        console.log("Error in verify token", error);
        return res.status(500).json({succes: false, message: "Server error"});
    }
}