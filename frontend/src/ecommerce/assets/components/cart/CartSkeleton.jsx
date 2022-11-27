import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CartSkeleton = ({ carts }) => {
    return (
        <SkeletonTheme baseColor="#777" highlightColor="#444">
            {Array(carts).fill(0).map((_, i) => (
                <div className='cart-child d-flex align-items-center' key={i}>
                    <div>
                        <Skeleton width={150} height={100} style={{ width: 'inline=block' }} inline={true} />
                    </div>
                    <div>
                        <Skeleton width={300} count={3} style={{ width: 'inline=block' }} />
                    </div>
                </div>
            ))
            }
        </SkeletonTheme>
    )
}

export default CartSkeleton