import { config } from "../../../utils/Constants"

const SelectItemShow = ({ orderDetails }) => {
    const baseURL = config.url.API_URL
    console.log(orderDetails)
    let imagePath = baseURL + "uploads/"
    return (
        <div className="px-50">
            {orderDetails.itemsOrdered.map((item) => (
                <div key={item.productId} className="mx-2 my-1">
                    {item.productName}
                    <img src={imagePath + item.productImg} alt="" />
                    {item.productDesc}
                    {item.productPrice}
                    {item.productQty}
                </div>
            ))}
        </div>
    )
}

export default SelectItemShow
