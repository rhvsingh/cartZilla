import { useState } from "react"
import fallBackImage from "../../../assets/image/Image_not_available.png"

const ProductImage = ({ imagePath }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    return (
        <img
            src={hasError ? fallBackImage : imagePath}
            alt="Product"
            style={isLoaded ? {} : { display: "none" }}
            onLoad={() => setIsLoaded((oldValue) => !oldValue)}
            onError={() => setHasError((oldValue) => !oldValue)}
        />
    )
}

export default ProductImage
