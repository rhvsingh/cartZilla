import { config } from "../../../utils/Constants"
import { commaAdder } from "../../../utils/utilityFunctions"

import "../../pages/cart.css"

const SelectItemShow = ({ orderDetails }) => {
    const baseURL = config.url.API_URL
    let imagePath = baseURL + "uploads/"
    return (
        <div className="px-50">
            {orderDetails.itemsOrdered.map((item) => (
                <div key={item.productId} className="mx-2 my-1 d-flex gap-50">
                    <div style={{ maxWidth: "200px", borderRadius: "4px", overflow: "hidden" }}>
                        <img src={imagePath + item.productImg} alt="" />
                    </div>
                    <div>
                        <h5>{item.productName}</h5>
                        <div>Qty: {item.productQty}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        {item.productDiscount > 0 ? (
                            <div style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                                <span className="product-price-mark">
                                    {commaAdder(item.productPrice)}
                                </span>
                                <span
                                    className="product-price pl-25"
                                    style={{ fontSize: "0.9rem" }}
                                >
                                    {commaAdder(item.productDiscountedPrice)}
                                </span>
                            </div>
                        ) : (
                            <div className="product-price" style={{ fontSize: "0.9rem" }}>
                                {commaAdder(item.productPrice)}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SelectItemShow
