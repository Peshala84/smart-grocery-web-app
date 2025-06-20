import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY

    const navigate = useNavigate();
    const [user, setUser] = useState(true)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})


    // Dummy function to simulate fetching products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    };

    // Fetch products when the component mounts
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]){
            cartData[itemId] += 1;

        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //update cart item
    const updateCartItem  = (itemId , quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated")
    }

    //remove item from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId]===0){
                delete cartData[itemId];
            }
        }
        toast.success("Item removed from Cart")
        setCartItems(cartData);
    }

    useEffect(() => {
        fetchProducts();
    }, [])


    const value = {
        navigate, user, setUser, setIsSeller, isSeller,
        showUserLogin, setShowUserLogin, products, currency , addToCart, updateCartItem,
        removeFromCart , cartItems
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}