import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
   const {token} = req.cookies;

   if(!token){
          return res.json({success: false, message: "Please login to access this resource"});
   }
   try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if(tokenDecode.id){
        req.body.userId = tokenDecode.id;
    } else {
        return res.json({success: false, message: "Invalid token"});
    }
    next();

    
   } catch (error) {
     res.json({success: false, message: "Invalid token"});
   }

}

export default authUser;