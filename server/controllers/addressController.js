import Address from "../models/Address.js";


export const addAddress = async (req, res) => {
    try {

        const { address, userId } = req.body;
        await Address.create({ ...address, userId })
        res.json({ success: true, message: "Address added successfully" });

    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ success: false, message: "Failed to add address" });

    }
}

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await Address.find({ userId })
        res.json({ success: true, addAddress });


    } catch (error) {
        console.error("Error fetching address:", error);
        res.status(500).json({ success: false, message: "Failed to fetch address" });

    }
}