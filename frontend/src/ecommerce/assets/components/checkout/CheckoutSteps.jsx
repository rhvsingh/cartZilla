import SelectAddress from "./SelectAddress"

const CheckoutSteps = (props) => {
  return (
    <div>
      <SelectAddress setOrderDetails={props.setOrderDetails} />
      <br />
      1. Select Delivery Address
      <br />
      2. Select Payment Method
      <br />
      3. Items shown
      <br />
      4. Place Order Button and Total Price
    </div>
  )
}

export default CheckoutSteps
