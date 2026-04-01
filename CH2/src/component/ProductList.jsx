import styles from './ProductList.module.css'
import ProductCard from './ProductCard'

const products = [
    { id: 1, image: '/Rectangle 4-0.png', brand: '하하브랜드', name: '버블 블라우스', price: 34000 },
    { id: 2, image: '/Rectangle 4-1.png', brand: '키키브랜드', name: '그물 니트 가디건', price: 28400, discount: 23 },
    { id: 3, image: '/Rectangle 4-2.png', brand: '아아브랜드', name: '키치 라운드티', price: 17900 },
    { id: 4, image: '/Rectangle 4-3.png', brand: '호호브랜드', name: '카라 블라우스', price: 23800, discount: 30 },
    { id: 5, image: '/Rectangle 4-4.png', brand: '마마브랜드', name: '쉬폰 블라우스', price: 50660 },
    { id: 6, image: '/Rectangle 4-5.png', brand: '히히브랜드', name: '여성 브이넥', price: 19200, discount: 18 },
    { id: 7, image: '/Rectangle 4-6.png', brand: '모모브랜드', name: '체크 스커트', price: 30000, discount: 20 },
    { id: 8, image: '/Rectangle 4-7.png', brand: '남남브랜드', name: '나시 니트', price: 43600 },
    { id: 9, image: '/Rectangle 4-8.png', brand: '루루브랜드', name: '린넨 셔츠', price: 39000 },
    { id: 10, image: '/Rectangle 4-9.png', brand: '소소브랜드', name: '오버핏 티셔츠', price: 25000, discount: 15 },
    { id: 11, image: '/Rectangle 4-10.png', brand: '두두브랜드', name: '와이드 팬츠', price: 45000 },
    { id: 12, image: '/Rectangle 4-11.png', brand: '비비브랜드', name: '플리츠 스커트', price: 32000, discount: 10 },
]

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
