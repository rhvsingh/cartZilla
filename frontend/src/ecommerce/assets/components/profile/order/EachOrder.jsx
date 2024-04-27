const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const EachOrder = ({ order }) => {
    let date = new Date(order.order_date)

    function toLocal(x) {
        x = parseFloat(x)
        return x.toLocaleString("en-IN")
    }

    return (
        <tr>
            <td data-alias="order-id">{order.order_id}</td>
            <td>
                {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
            </td>
            <td data-alias="status">{order.status}</td>
            <td>Rs. {toLocal(order.total_amount)}</td>
        </tr>
    )
}

export default EachOrder
