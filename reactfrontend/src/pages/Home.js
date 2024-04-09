import { React, useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/products");
                setProducts(response.data);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, [])

    return (
        <div>
        </div>
    )
}

export default Home