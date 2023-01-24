import React, { useState } from "react"

import { config } from "../../../utils/Constants"

const CartEach = ({ details, deleteCart, changeQty, proFromCartDelete }) => {
  const baseURL = config.url.API_URL
  const proDetails = details.productDetails
  const [qty, setQty] = useState(details.qty)

  async function qtyChanger(qty, pid) {
    await changeQty(qty, pid)
    setQty((oldValue) => {
      let newValue = oldValue + qty
      if (newValue === 0) {
        deleteCart(details.pid)
      }
      if (newValue >= 0) {
        return newValue
      }
    })
  }

  return (
    <div className="cart-child d-flex align-items-center justify-between">
      <div className="d-flex align-items-center">
        <div className="cart-image">
          <img
            src={baseURL + "uploads/" + proDetails.img}
            alt={proDetails.name}
          />
        </div>
        <div className="cart-child-detail px-1">
          <div className="cart-name">{proDetails.name}</div>
          <div className="cart-desc">{proDetails.desc}</div>
          <div className="cart-amount cart-mobile-only">
            <span className="cart-price">{proDetails.price}</span>
            <span className="cart-discount">(-{proDetails.discount}%)</span>
          </div>
          <div className="cart-qty">
            Quantity:
            <span className="cart-qty-container">
              <span onClick={(e) => qtyChanger(-1, proDetails.pid)}>-</span>
              {qty}
              <span onClick={(e) => qtyChanger(1, proDetails.pid)}>+</span>
            </span>
            <span
              className="cart-delete-button"
              onClick={(e) => proFromCartDelete(proDetails.pid)}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="cart-amount px-1">
          <span className="cart-price">{proDetails.price}</span>
          <span className="cart-discount">(-{proDetails.discount}%)</span>
        </div>
      </div>
    </div>
  )
}

export default CartEach
