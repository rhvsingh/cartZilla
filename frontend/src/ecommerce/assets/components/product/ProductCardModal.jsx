import axios from 'axios'
import React, { useRef, useState } from 'react'

const ProductCardModal = ({ modalToggle, proAdd }) => {

  const [modal, setModal] = useState(true)
  const [imgFile,setImgFile] = useState('')
  const proName = useRef()
  const proDesc = useRef()
  const proPrice = useRef()
  const proDiscount = useRef()

  const closeModal = () => {
    setModal(oldValue => !oldValue)
    setTimeout(() => {
      modalToggle(false)
    }, 500)
  }

  const imageChanger = (e) => {
      setImgFile(e.target.files[0])
  }

  async function formData (e) {
    e.preventDefault()

    let data = new FormData()

    data.append('productImage', imgFile)

    let img;
    await axios.post('http://localhost:4000/product/img/test', data).then((response)=> {
      console.log(response.data.imgName)
      img = response.data.imgName
    })

    let name = proName.current.value
    let desc = proDesc.current.value
    let price = parseInt(proPrice.current.value)
    let discount = parseInt(proDiscount.current.value)
    proAdd({ img, name, desc, price, discount })
    closeModal()
  }

  return (
    <div className='product-modal'>
      <div className='product-modal-overlay' onClick={closeModal}></div>
      <div className={modal === true ? 'product-modal-card modal-open' : 'product-modal-card modal-close'}>
        <h2>Add Product</h2>
        <form onSubmit={formData}>
          <div style={{padding:'1rem'}}><img src={imgFile === '' ? '': URL.createObjectURL(imgFile)} style={{width: '100%', display: 'block', borderRadius: '4px'}} alt="" /></div>
          <div><input type="file" onChange={imageChanger} required /></div>
          <div><input type="text" placeholder='Enter name' ref={proName} required /></div>
          <div><input type="text" placeholder='Enter description' ref={proDesc} required /></div>
          <div><input type="text" placeholder='Enter price' ref={proPrice} required /></div>
          <div><input type="text" placeholder='Enter discount' ref={proDiscount} required /></div>
          <div><input type="submit" value="Add" /></div>
        </form>
      </div>
    </div>
  )
}

export default ProductCardModal