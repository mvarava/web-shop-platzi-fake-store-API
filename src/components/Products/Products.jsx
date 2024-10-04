import React from 'react';

import { Link } from 'react-router-dom';

import styles from '../../styles/Products.module.css';

const Products = ({ products = [], title, style = {}, amount }) => {
  const filteredProductsList = products.filter((_, i) => i < amount);

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}
      <div className={styles.list}>
        {filteredProductsList.map(({ id, images, title, category: { name: cat }, price }) => (
          <Link className={styles.product} to={`/products/${id}`} key={id}>
            <div className={styles.image} style={{ backgroundImage: `url(${images[0]})` }} />

            <div className={styles.wrapepr}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.cat}>{cat}</div>
              <div className={styles.info}>
                <div className={styles.prices}>
                  <div className={styles.price}>{price}$</div>
                  <div className={styles.oldPrice}>{Math.floor(price * 0.8)}$</div>
                </div>
                <div className={styles.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchased
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
