import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './ProductDetail.module.css'
import products from '../data/products'
import heartImg from '../assets/Heart.png'
import starImg from '../assets/star.svg'

function ProductDetail() {
    const { id } = useParams()
    const product = products.find((p) => p.id === Number(id))

    const [selectedSize, setSelectedSize] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const handleSelectSize = (size) => {
        setSelectedSize(size)
        setIsDropdownOpen(false)
    }

    const handleRemoveSize = () => {
        setSelectedSize(null)
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('사이즈를 선택해 주세요.')
            return
        }
    }

    if (!product) {
        return (
            <section className={styles.notFound}>
                존재하지 않는 상품입니다.
            </section>
        )
    }

    return (
        <section className={styles.section}>
            <div className={styles.left}>
                <div className={styles.imageWrapper}>
                    <img src={product.image} alt={product.name} className={styles.image} />
                </div>

                <div className={styles.info}>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>품번</span>
                        <span className={styles.infoValue}>000-000-000</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>성별</span>
                        <span className={styles.infoValue}>여</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>시즌</span>
                        <span className={styles.infoValue}>2026</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>누적 판매</span>
                        <span className={styles.infoValue}>1.3천 개 이상</span>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.tabActive}`}>정보</button>
                    <button className={styles.tab}>사이즈</button>
                    <button className={styles.tab}>리뷰</button>
                    <button className={styles.tab}>문의</button>
                </div>

                <div className={styles.tabContent}>
                    <img src={product.descriptionImage} alt={product.name} className={styles.detailImage} />
                </div>
            </div>

            <aside className={styles.right}>
                <div className={styles.brand}>{product.brand}</div>
                <div className={styles.category}>상의 &gt; 여성상의</div>
                <h1 className={styles.name}>{product.name}</h1>

                <div className={styles.tags}>
                    <span className={styles.tag}>여성인기</span>
                    <span className={styles.tag}>무료배송</span>
                    <span className={styles.tag}>LOGO단독</span>
                </div>

                <div className={styles.review}>
                    <img src={starImg} alt="별점" className={styles.star} />
                    <span className={styles.rating}>4.8</span>
                    <span className={styles.reviewCount}>후기 73개</span>
                </div>

                {product.discountRate > 0 && (
                    <div className={styles.originalPrice}>
                        {product.originalPrice.toLocaleString()}
                    </div>
                )}
                <div className={styles.priceRow}>
                    {product.discountRate > 0 && (
                        <span className={styles.discount}>{product.discountRate}%</span>
                    )}
                    <span className={styles.price}>{product.price.toLocaleString()}</span>
                    <button className={styles.heartBtn}>
                        <img src={heartImg} alt="좋아요" className={styles.heartIcon} />
                    </button>
                </div>

                <div
                    className={styles.sizeSelect}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                    <span>사이즈</span>
                    <span className={styles.chevron}>∨</span>
                </div>

                {isDropdownOpen && (
                    <ul className={styles.sizeOptions}>
                        {product.sizes.map((size) => (
                            <li
                                key={size}
                                className={styles.sizeOption}
                                onClick={() => handleSelectSize(size)}
                            >
                                {size}
                            </li>
                        ))}
                    </ul>
                )}

                {selectedSize && (
                    <div className={styles.selectedBox}>
                        <div className={styles.selectedHeader}>
                            <span className={styles.selectedSize}>{selectedSize}</span>
                            <button
                                className={styles.removeBtn}
                                onClick={handleRemoveSize}
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.selectedDate}>03.26 (목) 도착 예정</div>

                        <div className={styles.quantityRow}>
                            <div className={styles.quantityControl}>
                                <button className={styles.quantityBtn}>-</button>
                                <span className={styles.quantityValue}>1</span>
                                <button className={styles.quantityBtn}>+</button>
                            </div>
                            <span className={styles.itemPrice}>
                                {product.price.toLocaleString()}
                            </span>
                        </div>

                        <div className={styles.totalRow}>
                            <span className={styles.totalLabel}>총 1개</span>
                            <span className={styles.totalPrice}>
                                {product.price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                )}

                <div className={styles.buttonRow}>
                    <button className={styles.cartBtn} onClick={handleAddToCart}>장바구니</button>
                    <button className={styles.buyBtn}>구매하기</button>
                </div>

                <div className={styles.shippingBox}>
                    <div className={styles.shippingTitle}>LOGO 회원은 전 품목 무료배송</div>
                    <div className={styles.shippingDesc}>(일부 상품 및 도서 산간 지역 제외)</div>
                </div>

                <div className={styles.deliveryBox}>
                    <div>03.26 (목) 도착 예정</div>
                    <div>결제 3일 이내 발송 예정</div>
                </div>
            </aside>
        </section>
    )
}

export default ProductDetail