import React, {useState} from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import ProductCardModal from './ProductCardModal'

const ProductCardAdd = ({proAdd}) => {

    const [isOpen, setIsOpen] = useState(false)

    const modal = () => {
        setIsOpen(lastValue => !lastValue)
    }

    return (
        <>
            <div className='modal-opener d-flex align-items-center' onClick={modal}>
                <div className='opener-icon'><FaPlusCircle /></div><div className='opener-text'>Add Product </div> 
            </div>
            { isOpen && <ProductCardModal modalToggle={setIsOpen} proAdd={proAdd} />}
        </>
    )
}

export default ProductCardAdd