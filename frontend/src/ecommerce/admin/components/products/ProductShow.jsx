import { config } from "../../../utils/Constants"

import AdminStyle from "../css-modules/admin.module.css"

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
                        <td>
                            <img src={baseURL + product.img[0]} alt="Product" />
                        </td>
                        <td>{product.name}</td>
                        <td>
                            {Array.isArray(product.category)
                                ? product.category.map((cat) => (
                                      <div key={cat._id}>{cat.catName}</div>
                                  ))
                                : product.category}
                        </td>
                        <td>{product.price}</td>
                        <td>{product.discount}</td>
                        <td>{product.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProductShow
