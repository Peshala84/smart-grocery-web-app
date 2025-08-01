import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrderCOD = async (req, res)=>{
    try {
        const { userId, items, address } = req.body;
        if(!address || items.length === 0){
            return res.json({ success: false, message: "Invalid order details" });
        }
        let amount = await items.reduce(async(acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: 'COD',
        });

        return res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.error("Error plaing COD order:", error);
        res.status(500).json({ success: false, message: "Failed to place COD order" });
        
    }
}

export const getUserOrders = async (req, res)=>{
    try {

        const { userId} = req.body;
        const orders = await Order.find({
            userId,
            $or: [{
                paymentType: "COD"
            }, {
                isPaid: true
            }]

        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
        
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user orders" });
    }
}

export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{
                paymentType: "COD"
            }, {
                isPaid: true
            }]

        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders });
        
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user orders" });
    }
}

