import { NavLink } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"
import logo from '../assets/images/images.jpeg'
import styled from '/src/styles/header.module.css'

const Header = () => {
    return (
      <header className={styled.header}>
        <div>
          <NavLink to="/">
            <img className={styled.logo} src={logo} alt="Logo" />
          </NavLink>
        </div>
  
        <nav>
          <ul className={styled.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styled.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? styled.active : "")}
              >
                Products
              </NavLink>
            </li>
          </ul>
        </nav>
  
        <div>
          <button className={styled["shopping-cart"]}>
            <NavLink 
                to="/shopping-cart"
                className={({ isActive }) => (isActive ? styled.active : "")}
            >
              <FaShoppingCart size={24} />
            </NavLink>
          </button>
        </div>
      </header>
    );
  };

export default Header