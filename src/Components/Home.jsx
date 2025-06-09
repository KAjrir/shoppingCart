import { Link } from "react-router-dom";
import styles from "../styles/heroSection.module.css";

function Home() {

  return (
    <section className={styles.hero}>
      <div className={styles.textContainer}>
        <h1>Welcome to BabbyLove</h1>
        <p>Your go-to place for stylish and practical products</p>
        <Link to={"/products"} className={styles.button}>
          Explore Products
        </Link>
      </div>
    </section>
  )
}

export default Home
