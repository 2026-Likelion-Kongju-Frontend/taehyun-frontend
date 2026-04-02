import { useState } from 'react'
import styles from './ProductCard.module.css'
import heartImg from '../assets/Heart.png'
import heartActiveImg from '../assets/Heart_active.png'

function ProductCard({ image, brand, name, price, discountRate, isLiked }) {
    const [liked, setLiked] = useState(isLiked)

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
                    {discountRate && (
                        <span className={styles.discount}>{discountRate}%</span>
                    )}
                    <span className={styles.price}>
                        {price.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
