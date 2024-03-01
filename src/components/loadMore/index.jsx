
import { useEffect, useState } from "react"
// import { BsArrowLeftCircleFill , BsArrowRightCircleFill} from "react-icons/bs"
import "./styles.css"

export default function LoadMore({url, limit}) {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [count, setCount] = useState(0)
    const [noMoreProducts, setNoMoreProducts] = useState(false)
    const [totalProducts, setTotalProducts] = useState(0)

    async function fetchProducts() {

        try {
            const URL = url.replace("LIMIT", limit).replace("SKIP", count * limit)
            // console.log(`Fetching product data from ${URL}`)
            setLoading(true)

            const response = await fetch(URL)
            const data = await response.json()

            if (data?.products?.length > 0) {
                setProducts(products.concat(data.products))
                // console.log(`products now contains ${products.length} items`)
                setLoading(false)

                if (totalProducts < data.total) {
                    setTotalProducts(data.total)
                }
            }
        } catch(e) {
            setErrorMsg(e.message)
            setLoading(false)
        }
    }

    useEffect( () => {
        fetchProducts()
    }, [count]);

    useEffect(() => {
        if (totalProducts && products?.length >= totalProducts) {
            setNoMoreProducts(true);
        }
      }, [products, totalProducts]);

    if (loading) {
        return <div className="loading">Loading product data...</div>
    }

    if (errorMsg) {
        return <div>Error loading product data: {errorMsg}</div>
    }

    return <div className="loadMore">
        <div className="productList">
        {
            products?.length ?
            products.map( (product) => {
                return <div className="product" key={product.id}>
                        <img src={product.thumbnail} alt={product.title}></img>
                        <p>{product.title}</p>
                    </div>
                })
                : null
        }
        </div>
        <button disabled={noMoreProducts} onClick={ () => {setCount(count+1); } } className="loadMore">Load More Products</button>
    </div>
}