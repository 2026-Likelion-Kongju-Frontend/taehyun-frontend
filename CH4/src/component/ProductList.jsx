import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard";
import { getProducts, toggleProductLike } from "../api/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const data = await getProducts();
        setProducts(data);
      } catch {
        setErrorMessage("상품 목록을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleToggleLike = async (productId) => {
    const previousProducts = [...products];
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, isLiked: !product.isLiked }
          : product,
      ),
    );

    try {
      const result = await toggleProductLike(productId);
      if (Array.isArray(result?.likedProductIds)) {
        const likedSet = new Set(result.likedProductIds);
        setProducts((prev) =>
          prev.map((product) => ({
            ...product,
            isLiked: likedSet.has(product.id),
          })),
        );
      }
    } catch {
      setProducts(previousProducts);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <section className={styles.section}>
        <p>상품 목록을 불러오는 중입니다.</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className={styles.section}>
        <p>{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        LOGO <span className={styles.highlight}>인기</span> 상품
      </h2>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onToggleLike={handleToggleLike}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
