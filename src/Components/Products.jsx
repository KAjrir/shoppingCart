import { useFetcher, useLoaderData } from "react-router-dom"
import { fetchProducts, addToCart } from "../information"
import styled from "../styles/products.module.css"

export async function loader() {
    const products = await fetchProducts()
    return { products }
}

export async function action({ request }){
    const formData = await request.formData()
    const raw = formData.get('product')
    const product = JSON.parse(raw)
    console.log(product)
    addToCart(product)
  
}

export default function Products() {

    const { products } = useLoaderData();
    console.log(products)

    // const filterdProducts = products?.filter(product => product.category === "electronics")

    return(
        <main className={styled['product-page']}>
            <h1 className={styled.title}>Products</h1>
            <div className={styled['product-list']}>
                {products?.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </main>
    )
}


const ProductCard = ({ product }) => {
    const fetcher = useFetcher()

    const handleAddToCart = () => {
        const formData = new FormData();
        
    
        formData.append('product', JSON.stringify(product));
        fetcher.submit(formData, {
            method: 'post',
        })
    }


    return(
            <button onClick={handleAddToCart} className={styled['product-card']}>
                <p className={styled['product-title']}>{product.title}</p>
                <img className={styled.image} src={product.image} alt="" />
                <div>
                    <p className={styled.price}>€ {product.price.toFixed(2)}</p>
                    <p className={styled.addToCard}>Click to add to cart</p>
                </div>
            </button>
    )
}