import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { authToken } = useAuth();
    const isLoggedIn = authToken !== null;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/products");
                setProducts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddtoCart = async (productId) => { // Modify the parameter to accept productId
        try {
            const response = await axios.post("http://127.0.0.1:5000/add_to_cart", {"token": authToken, "productId": productId}); // Pass productId instead of itemName
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='flex flex-row m-5'>
                {products.map(product => (
                    <div className='bg-gray-300 m-5 p-3 rounded-xl' key={product.itemName}>
                        <img src={product.image} alt={product.itemName} className='w-[250px] h-[250px]' />
                        <h2 className='font-bold text-xl my-3'>{product.itemName}</h2>
                        <p className='product-description'>{product.description}</p>
                        <p className='product-price'>Rs {product.price}</p>
                        {isLoggedIn &&
                            <button onClick={() => handleAddtoCart(product._id)} className='bg-blue-300 p-2 rounded-md my-2'> {/* Pass productId */}
                                Add to Cart
                            </button>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
