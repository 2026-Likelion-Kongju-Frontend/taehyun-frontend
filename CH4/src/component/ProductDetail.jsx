import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import heartImg from "../assets/Heart.png";
import starImg from "../assets/star.svg";
import { getProductById } from "../api/products";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectSize = (size) => {
    setIsDropdownOpen(false);
    if (selectedItems.some((item) => item.size === size)) return;
    setSelectedItems((prev) => [...prev, { size, quantity: 1 }]);
  };

  const handleRemoveSize = (size) => {
    setSelectedItems((prev) => prev.filter((item) => item.size !== size));
  };

  const handleDecrease = (size) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const handleIncrease = (size) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.size === size
          ? { ...item, quantity: Math.min(9, item.quantity + 1) }
          : item,
      ),
    );
  };

  const totalQuantity = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      alert("사이즈를 선택해 주세요.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    selectedItems.forEach((item) => {
      const existingIndex = cart.findIndex(
        (entry) => entry.name === product.name && entry.size === item.size,
      );
      if (existingIndex >= 0) {
        cart[existingIndex].quantity = Math.min(
          9,
          cart[existingIndex].quantity + item.quantity,
        );
      } else {
        cart.push({
          name: product.name,
          price: product.price,
          size: item.size,
          quantity: item.quantity,
        });
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 담겼습니다.");
    setSelectedItems([]);
  };

  if (!product) {
    return (
      <section className={styles.notFound}>존재하지 않는 상품입니다.</section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
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
          <img
            src={product.descriptionImage}
            alt={product.name}
            className={styles.detailImage}
          />
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

        {selectedItems.length > 0 && (
          <div className={styles.selectedBox}>
            {selectedItems.map((item) => (
              <div key={item.size} className={styles.selectedItem}>
                <div className={styles.selectedHeader}>
                  <span className={styles.selectedSize}>{item.size}</span>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveSize(item.size)}
                  >
                    ×
                  </button>
                </div>
                <div className={styles.selectedDate}>03.26 (목) 도착 예정</div>

                <div className={styles.quantityRow}>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => handleDecrease(item.size)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>
                      {item.quantity}
                    </span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => handleIncrease(item.size)}
                      disabled={item.quantity === 9}
                    >
                      +
                    </button>
                  </div>
                  <span className={styles.itemPrice}>
                    {(product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>총 {totalQuantity}개</span>
              <span className={styles.totalPrice}>
                {(product.price * totalQuantity).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className={styles.buttonRow}>
          <button className={styles.cartBtn} onClick={handleAddToCart}>
            장바구니
          </button>
          <button className={styles.buyBtn}>구매하기</button>
        </div>

        <div className={styles.shippingBox}>
          <div className={styles.shippingTitle}>
            LOGO 회원은 전 품목 무료배송
          </div>
          <div className={styles.shippingDesc}>
            (일부 상품 및 도서 산간 지역 제외)
          </div>
        </div>

        <div className={styles.deliveryBox}>
          <div>03.26 (목) 도착 예정</div>
          <div>결제 3일 이내 발송 예정</div>
        </div>
      </aside>
    </section>
  );
}

export default ProductDetail;
