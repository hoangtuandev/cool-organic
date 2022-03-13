import { React, useState, useEffect } from 'react';
import axios from 'axios'
import styles from './Products.module.scss'
import ProductsContent from './ProductsContent';
import ProductsHeader from './ProductsHeader';
import AddProduct from './AddProduct';
import UpdateProduct from '../PromptBox/UpdateProduct'
import PromptDelete from '../PromptBox/PromptDelete'


function Products() {

    const baseUrl = 'http://localhost:3333'
    const [allProductsList, setAllProductList] = useState([])
    const [isShowPromptDelete, setIsShowPromptDelete] = useState(false)
    const [isShowPromptUpdate, setIsShowPromptUpdate] = useState(false)
    const [inforProduct, setInforProduct] = useState({})
    const [isDeleteProduct, setIsDeleteProduct] = useState(false)
    const [inforProductUpdate, setInforProductUpdate] = useState({})

    useEffect(() => {
        getAllProducts()
    }, []);

    const getAllProducts = () => {
        axios.get(baseUrl + '/products', {})
            .then((res) => {
                setAllProductList(res.data)
            })
    }

    const handleIsShowPromptUpdate = (id, name, avatar, price, unit, stock, catagory) => {
        setIsShowPromptUpdate(!isShowPromptUpdate)
        // console.log(id, name, avatar, price, unit, stock, catagory)
        setInforProductUpdate({ id, name, avatar, price, unit, stock, catagory })

    }

    const handleShowPromptDelete = (avatar, id, name) => {
        setIsShowPromptDelete(!isShowPromptDelete)
        setInforProduct({ avatar, id, name })
        setIsDeleteProduct(!isDeleteProduct)
    }

    return (
        <div className={`${styles.products}`}>
            <AddProduct
                getAllProducts={getAllProducts}
            >
            </AddProduct>

            {isShowPromptUpdate &&
                <UpdateProduct
                    getAllProducts={getAllProducts}
                    inforProductUpdate={inforProductUpdate}
                    setIsShowPromptUpdate={setIsShowPromptUpdate}
                    handleIsShowPromptUpdate={handleIsShowPromptUpdate}
                ></UpdateProduct>
            }

            {isShowPromptDelete &&
                <PromptDelete
                    datas={inforProduct}
                    isDeleteProduct={isDeleteProduct}
                    getAllProducts={getAllProducts}
                    handleShowPromptDelete={handleShowPromptDelete}
                ></PromptDelete>}

            <table className={`${styles.tableProducts}`}>
                <ProductsHeader></ProductsHeader>
                {
                    allProductsList.map((product, index) => (
                        <ProductsContent
                            key={index}
                            datas={product}
                            handleIsShowPromptUpdate={handleIsShowPromptUpdate}
                            handleShowPromptDelete={handleShowPromptDelete}

                        ></ProductsContent>
                    ))
                }

            </table >
        </div >
    );
}

export default Products;