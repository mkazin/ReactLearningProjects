import { useEffect, useState, useCallback, useRef } from "react"
import "./styles.css"

export default function LoadMore({ url, limit }) {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [count, setCount] = useState(undefined)
  const [noMoreProducts, setNoMoreProducts] = useState(false)
  const [totalProducts, setTotalProducts] = useState(0)

  // Hook to keep track of previous value to provide a circuit breaker
  // from duplicate fetches when count is updated in fetchProducts
  function usePrevious(value) {
    const ref = useRef(undefined);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const prevCount = usePrevious(count);

  const fetchProducts = useCallback(async () => {
    try {

      if (loading || noMoreProducts) {
        return;
      } else if (prevCount !== undefined && prevCount === count) {
        // same page count as before and we're past initializing count
        return
      } else if (count === undefined) {
        // initializing count to 0 will trigger another call to fetchProducts,
        // so we need to abort here to avoid a second fetching
        setCount(0);
        return
      } else {
        setLoading(true);

        var url = `https://dummyjson.com/products?limit=20&skip=${count ? count * 20 : 0}`
        console.log(`FETCH @ ${url}...`)
        const response = await fetch(url);

        if (!response.ok) {
          console.error(`${response.status} - ${response.statusText}`)
          setErrorMsg(`${response.status} - ${response.statusText}`);
          return
        }

        const result = await response.json();

        if (result && result.products && result.products.length) {
          if (!totalProducts) {
            setTotalProducts(result.total);
          }
          setProducts((prevData) => [...prevData, ...result.products]);
          setLoading(false);
        }

        console.log(`RESPONSE: ${result.products.length} products returned from ${url}...`);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [count, totalProducts, loading, noMoreProducts, prevCount]);

  useEffect(() => {
    fetchProducts();
  }, [count, fetchProducts]);

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
          products.map((product) => {
            return <div className="product" key={product.id}>
              <img src={product.thumbnail} alt={product.title}></img>
              <p>{product.title}</p>
            </div>
          })
          : null
      }
    </div>
    <button disabled={noMoreProducts} onClick={() => { setCount(count + 1); }} className="loadMore">Load More Products</button>
  </div>
}