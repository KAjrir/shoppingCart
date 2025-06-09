import { Form, useFetcher, useLoaderData } from "react-router-dom"
import { addingToCart, deleteProduct, fetchShoppingCartItems } from "../information"
import styled from "../styles/shoppingCart.module.css"
import { useState } from "react"


export function loader() {
    const cartItems = fetchShoppingCartItems()
    return { cartItems }
}

export async function action({ request }) {
    const formData = await request.formData()
    const intent = formData.get('intent')
    
    switch(intent){
        case 'changeAmountItem':
            const raw = formData.get('cartItemChange')
            const {product, quantity} = JSON.parse(raw)
            console.log(product, quantity)
            addingToCart(product, quantity)
            break;
        case 'Delete':
            const raw1 = formData.get('itemToBeDeleted')
            const itemToBeDeleted = JSON.parse(raw1)
            console.log(itemToBeDeleted)
            deleteProduct(itemToBeDeleted)
            break;
    }
    
}




export default function ShoppingCart() {
    const { cartItems } = useLoaderData()

    let total = cartItems.reduce((total, curr) => {
        total = total + (curr.quantity * curr.price)
        return total
    }, 0)

    total = total.toFixed(2)


    
    return (
        <main className={styled.main}>
            <h1>Shopping Cart</h1>
            <div className={styled.shoppingCartWrapper}>
                {cartItems.length > 0 ? (
                <>
                <div className={styled.shoppingList}>
                    {cartItems.map(item => (
                        <ShoppingCartItem key={item.id} product={item}/>
                    ))}
                </div>
                <div className={styled.basket}>
                    <h2 className={styled.overviewTitle}>Overview</h2>
                    <div className={styled.overviewPairs}>
                        <p className={styled.itemsTekst}>Items <span>( {cartItems.length} )</span></p>
                        <p>€ {total}</p>
                    </div>
                    <div className={styled.overviewPairs}>
                        <p>Shipping</p>
                        <p>€ 0.00</p>
                    </div>
                    <hr className={styled.hr}/>
                    <div className={styled.overviewPairs}>
                        <p>Total:</p>
                        <p>€ {total}</p>
                    </div>
                </div> </>) : (<div><p>Please add some products to your cart</p></div>)
            }  
            </div>
            
        </main>
    )
}

function ShoppingCartItem({product}){
    const {image, title, price: price1, rating, category} = product

    const price = price1.toFixed(2)
    const [quantity, setQuantity] = useState(product.quantity)
    const fetcher = useFetcher()

    const handleAddingToCart = (e) => {
        setQuantity(e.target.value);
    }

    const handleBlur = () => {
        let parsed = parseFloat(quantity);
        if (isNaN(parsed) || parsed <= 0) {
          setQuantity(1)
          parsed = 1
        }
    
        const formData = new FormData();
        formData.append('intent', 'changeAmountItem')
        formData.append('cartItemChange', JSON.stringify({product, quantity: parsed}));
    
        fetcher.submit(formData, {
          method: 'post',
        });
    }

    const handleDeleteItem = () => {
        const formData = new FormData()
        formData.append('intent', 'Delete')
        formData.append('itemToBeDeleted', JSON.stringify(product));
    
        fetcher.submit(formData, {
          method: 'post',
        });

    }


    
    return(
        <div className={styled.shoppingItem}>
            <div className={styled.imageAndMain}>
                <img className={styled.productImage} src={image} alt={title} />
                <div className={styled.productListMain}>
                    <p className={styled.category}>{category}</p>
                    <h5>{title}</h5>
                    <div className={styled.rating}>
                        <p>{rating.rate}</p>
                        <p>({rating.count})</p>
                    </div>
                    <div className={styled.inputBtn}>
                        <input
                            type="number"
                            min={1}
                            max={30}
                            value={quantity}
                            onChange={handleAddingToCart}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {if (e.key === 'Enter') handleBlur()}}
                        />
                        <button onClick={handleDeleteItem}>Remove Product</button>
                    </div>
                </div>
            </div>
            <p className={styled.price}>{`€ ${price}`}</p>
        </div>
    )
}