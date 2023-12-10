import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const ProductImageSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#777" highlightColor="#444">
            <Skeleton style={{ height: "200px" }} />
        </SkeletonTheme>
    )
}

export default ProductImageSkeleton
