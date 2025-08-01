import User from "../models/User.js"


export const updateCart  = async(req, res)=>{
    try {
        const { userId, cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success: true, message: "Cart updated successfully"})
        
    } catch (error) {
        console.error("Error updating cart:", error);
        res.json({success: false, message: "Failed to update cart"});
    }
}