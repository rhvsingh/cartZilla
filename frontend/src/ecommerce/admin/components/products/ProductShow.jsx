import { Link } from "react-router-dom"
import { config } from "../../../utils/Constants"

import AdminStyle from "../css-modules/admin.module.css"
import ProductImage from "./ProductImage"

const ProductShow = ({ products }) => {
    const baseURL = config.url.API_URL + "uploads/"

    return (
        <table className={AdminStyle.proTable}>
            <thead>
                <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.pid}>
                        <td data-alias="product-image">
                            <Link to={"product/" + product.pid}>
                                <ProductImage imagePath={baseURL + product.img[0]} />
                            </Link>
                        </td>
                        <td>{product.name}</td>
                        <td data-alias="category">
                            {Array.isArray(product.category)
                                ? product.category.map((cat) => (
                                      <span key={cat._id}>{cat.catName}</span>
                                  ))
                                : product.category}
                        </td>
                        <td data-alias="price">{product.price}</td>
                        <td data-alias="discount">{product.discount}</td>
                        <td data-alias="stock">{product.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProductShow
