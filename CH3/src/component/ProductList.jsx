import styles from './ProductList.module.css'
import ProductCard from './ProductCard'
import products from '../data/products'

function ProductList() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>
                LOGO <span className={styles.highlight}>인기</span> 상품
            </h2>

            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    )
}

export default ProductList
