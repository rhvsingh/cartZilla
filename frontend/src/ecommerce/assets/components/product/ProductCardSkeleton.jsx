import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductCardSkeleton = ({ cards }) => {
    return (
        <SkeletonTheme baseColor="#777" highlightColor="#444">
            {Array(cards).fill(0).map((_, i) => (
                <div className='product-card' key={i}>
                    <Skeleton style={{height:'200px'}}/>
                    <div className='product-details'>
                        <h2 className='product-name'><Skeleton /></h2>
                        <p className='product-desc'><Skeleton /></p>
                        <p className='product-amount'><Skeleton /></p>
                    </div>
                </div>
            ))
            }
        </SkeletonTheme>
    )
}

export default ProductCardSkeleton