import React from "react"

const ProductCardSkeleton = React.lazy(() => import("./ProductCardSkeleton"))
const ProductCards = React.lazy(() => import("./ProductCards"))

const ProductSimilarCat = ({ similarShow, productsData, productData, cleanCatName }) => {
    return (
        <>
            <div className="num mx-1">Products with same Category</div>
            <div className="products">
                {similarShow.current && (
                    <ProductCardSkeleton cards={productsData ? productsData.length : 4} />
                )}
                {productsData.length > 1
                    ? productsData.map((product) => {
                          if (product.pid === productData.pid) {
                              return ""
                          }
                          return (
                              <ProductCards
                                  pageLink={true}
                                  proURL={"../" + cleanCatName + "/" + product.pid}
                                  path={true}
                                  key={product.pid}
                                  product={product}
                              />
                          )
                      })
                    : "No more products in this category to show"}
            </div>
        </>
    )
}

export default ProductSimilarCat
