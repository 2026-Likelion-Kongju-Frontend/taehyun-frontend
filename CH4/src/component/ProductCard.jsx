import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.css'
import heartImg from '../assets/Heart.png'
import heartActiveImg from '../assets/Heart_active.png'

function ProductCard({ id, image, brand, name, price, discountRate, isLiked, onToggleLike }) {
    const [isLiking, setIsLiking] = useState(false)

    const handleHeartClick = async (e) => {
        e.preventDefault()
        if (isLiking) return

        setIsLiking(true)
        try {
            await onToggleLike?.(id)
        } finally {
            setIsLiking(false)
        }
    }

    return (
        <Link to={`/product/${id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={name} className={styles.image} />
            </div>

            <div className={styles.info}>
                <div className={styles.topRow}>
                    <span className={styles.brand}>{brand}</span>
                    <button
                        className={styles.heartBtn}
                        onClick={handleHeartClick}
                        disabled={isLiking}
                    >
                        <img
                            src={isLiked ? heartActiveImg : heartImg}
                            alt="좋아요"
                            className={styles.heartIcon}
                        />
                    </button>
                </div>

                <div className={styles.name}>{name}</div>

                <div className={styles.priceRow}>
                    {discountRate > 0 && (
                        <span className={styles.discount}>{discountRate}%</span>
                    )}
                    <span className={styles.price}>
                        {price.toLocaleString()}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
