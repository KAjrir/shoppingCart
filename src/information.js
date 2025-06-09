export async function fetchProducts() {
    const products = loadFromLocalstorage("products")

    if (products.length > 0) return products

    
    try{
        const res = await fetch('https://fakestoreapi.com/products')
        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }
        const products = await res.json();
        saveToLocalstorage('products', products)
        return products
    } catch (error) {
        console.log(error)
    }
}

export function addToCart(product) {
    let cart = loadFromLocalstorage('cart')
    const existing = cart.find(item => item.id === product.id)

    if(existing){
        cart = cart.map(item => (
            item.id === product.id ?
            {...item, quantity: item.quantity + 1} :
            item
        ))
    } else {
        cart = [...cart, {...product, quantity: 1}];
    }
    
    saveToLocalstorage('cart', cart)
}

export function addingToCart(product, quantity){
    let cart = loadFromLocalstorage('cart')
    const existing = cart.find(item => item.id === product.id)

    if(existing){
        cart = cart.map(item => (
            item.id === product.id ?
            {...item, quantity: quantity} :
            item
        ))
    } else {
        return
    }
    
    saveToLocalstorage('cart', cart)
}



export function fetchShoppingCartItems() {
    return loadFromLocalstorage('cart')
}

export function deleteProduct(product){
    const cart = loadFromLocalstorage('cart')
    const index = cart.findIndex(item => item.id === product.id)
    cart.splice(index, 1)
    saveToLocalstorage('cart', cart)
}




function saveToLocalstorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalstorage(key) {
    return JSON.parse(localStorage.getItem(key) || '[]')
}