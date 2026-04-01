import { useState } from 'react'
import styles from './ProductCard.module.css'
import heartImg from '../../public/Heart.png'
import heartActiveImg from '../../public/Heart_active.png'

function ProductCard({ image, brand, name, price, discount }) {
    const [liked, setLiked] = useState(false)

    const discountedPrice = discount
        ? Math.round(price * (1 - discount / 100))
        : null

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={name} className={styles.image} />
            </div>

            <div className={styles.info}>
                <div className={styles.topRow}>
                    <span className={styles.brand}>{brand}</span>
                    <button
                        className={styles.heartBtn}
                        onClick={() => setLiked(!liked)}
                    >
                        <img
                            src={liked ? heartActiveImg : heartImg}
                            alt="좋아요"
                            className={styles.heartIcon}
                        />
                    </button>
                </div>

                <div className={styles.name}>{name}</div>

                <div className={styles.priceRow}>
                    {discount && (
                        <span className={styles.discount}>{discount}%</span>
                    )}
                    <span className={styles.price}>
                        {(discountedPrice ?? price).toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
