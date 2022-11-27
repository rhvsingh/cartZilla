import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCards from '../components/product/ProductCards'
import ProductCardAdd from '../components/product/ProductCardAdd'
import ProductCardSkeleton from '../components/product/ProductCardSkeleton'
import { ToastContainer, toast } from 'react-toastify'
import './productShow.css'

const ProductShow = ({ isAuth }) => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const baseURL = 'http://localhost:4000/'

  function addToCart(pid) {
    let apiURL = baseURL + 'addCart/' + localStorage.getItem('akey')
    axios.post(apiURL, {
      "pid": pid,
      "qty": 1
    }).then((response) => {
      console.log(response.data)
      if(response.data.result) {
        toast.info('🦄 Product added to Cart')
      }
    })
  }

  useEffect(() => {
    let apiURL
    if (isAuth) {
      apiURL = baseURL + 'products/' + localStorage.getItem('akey')
      axios.get(apiURL).then((response) => {
        setProducts(response.data.data)
        setIsLoading(false)
      })
    } else {
      apiURL = baseURL + 'productList/'
      axios.get(apiURL).then((response) => {
        setProducts(response.data)
        setIsLoading(false)
      })
    }
    
  }, [isAuth]);

  const productAdd = (data) => {
    axios.post(baseURL + 'addProduct', {
      img: data.img,
      name: data.name,
      desc: data.desc,
      price: parseInt(data.price),
      discount: parseInt(data.discount)

    }).then((response) => {
      if (response.status === 200) {
        let pid = response.data.pid
        let newData = { pid, ...data }
        toast.success('🦄 Wow so easy! Product Added!')

        /* setProducts((oldValue) => {
          return [...oldValue, newData]
        }) */
        setProducts((oldValue) => {
          return [newData].concat(oldValue) //[...oldValue, data]
        })
      }
    })

  }

  return (
    <>
      <aside className='product-add-section'>
        <ProductCardAdd proAdd={productAdd} />
      </aside>
      <div className='products'>
        {isLoading && <ProductCardSkeleton cards={4} />}
        {products.length > 0 && products.map((product) => {
          return <ProductCards key={product.pid} product={product} isAuth={isAuth} cartAdder={addToCart} />
        })}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </>
  )
}

export default ProductShow