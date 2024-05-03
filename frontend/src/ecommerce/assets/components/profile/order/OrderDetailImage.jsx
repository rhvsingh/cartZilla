import { useState } from "react"

import ProductImageSkeleton from "../../product/ProductImageSkeleton"
import fallBackImage from "../../../image/Image_not_available.png"

import { config } from "../../../../utils/Constants"

const OrderDetailImage = ({ imageName }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)

    const baseURL = config.url.API_URL

    let imagePath = baseURL + "uploads/" + imageName
    return (
        <>
            {!isLoaded && <ProductImageSkeleton />}
            <img
                src={hasError ? fallBackImage : imagePath}
                alt={"Hello"}
                style={isLoaded ? {} : { display: "none" }}
                onLoad={() => setIsLoaded((oldValue) => !oldValue)}
                onError={() => setHasError((oldValue) => !oldValue)}
            />
        </>
    )
}

export default OrderDetailImage
