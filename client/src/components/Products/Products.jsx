import React from 'react';
import axios from 'axios'
import styles from './Products.module.scss'
import MenuCatagory from './MenuCatagory';
import Product from './Product';
import { useState, useEffect } from 'react';

function Products(props) {

    const { getIdProductSelected, handleSetCookiesIdProduct, handleRemoveCookiesIdProduct } = props
    const baseURL = 'http://localhost:3333'
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        window.scroll(0, 0)

        axios.get(baseURL + '/products', {})
            .then((res) => {
                setAllProducts(res.data)
            })
    }, [])

    return (
        <div className={`${styles.productsHome}`}>
            <MenuCatagory></MenuCatagory>

            <div className={`${styles.products}`}>
                <div></div>
                <div className={`${styles.productsList}`}>
                    <h2 className={`${styles.productTitle}`}>
                        <span>TẤT CẢ SẢN PHẨM</span>
                    </h2>
                    <ul>
                        {
                            allProducts.map((product, index) => (
                                <Product
                                    key={index} data={product}
                                    getIdProductSelected={getIdProductSelected}
                                    handleSetCookiesIdProduct={handleSetCookiesIdProduct}
                                    handleRemoveCookiesIdProduct={handleRemoveCookiesIdProduct}
                                ></Product>
                            ))
                        }
                    </ul>
                </div>
                <div></div>
            </div>
        </div >
    );
}

export default Products;