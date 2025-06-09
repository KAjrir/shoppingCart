import { Children } from "react"
import Home from "./Components/Home"
import Products, {loader as productLoader, action as productAction} from "./Components/Products"
import {loader as shoppingCartLoader, action as shoppingCartAction} from "./Components/ShoppingCart"
import ErrorPage from './ErrorPage'
import Layout from "./Layout"
import ShoppingCart from "./Components/ShoppingCart"


export const routes = [
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />,
                loader: productLoader,
                action: productAction,
            },
            {
                path: '/shopping-cart',
                element: <ShoppingCart />,
                loader: shoppingCartLoader,
                action: shoppingCartAction,
            }
        ]
    },
]