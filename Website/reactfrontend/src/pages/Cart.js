import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productDetails, setProductDetails] = useState([]);
    const { authToken } = useAuth();

    const fetchDetails = async (productId) => {
        try { 
            const response = await axios.post("http://127.0.0.1:5000/get_product", { "productId": productId });
            return response.data;
        } catch (error) {
            console.log("Error fetching details:", error);
            return null;
        }
    }

    
    

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.post("http://127.0.0.1:5000/get_cart", { "token": authToken });
                await setProducts(response.data.items);
                console.log("products: ", products);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);


    return (
        <div>
            {/* <button onClick={fetchCart}>Fetch Cart</button> */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                productDetails.map((product, index) => (
                    <div key={index}>
                        {product && (
                            <div>
                                <p>Item Name: {product.itemName}</p>
                                <p>Description: {product.description}</p>
                                <p>Price: Rs {product.price}</p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Cart;
