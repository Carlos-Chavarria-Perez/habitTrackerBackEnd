import jwt from "jsonwebtoken"


export const authMiddleware=(req,res, next)=>{
    try {
        const authHeader= req.headers["authorization"]
        if(!authHeader||!authHeader.startsWith("Bearer ")){
            return res.status(401).json({error:"token not provided"})
        }
        const token = authHeader.split(" ")[1]

        const decoded= jwt.verify(
            token,
            process.env.JWT_SECRET || "default_secret"
        )
        req.user= decoded

        next()
    } catch (error) {
        return res.status(401).json({error:"Invlid or expired token"})
    }
}