import React from 'react';

import styles from '../../styles/Categories.module.css';
import { Link } from 'react-router-dom';

const Categories = ({ categories = [], title, amount }) => {
  const filteredCategoriesList = categories.filter((_, i) => i < amount);

  return (
    <section className={styles.section}>
      <h2>{title}</h2>

      <div className={styles.list}>
        {filteredCategoriesList.map(({ id, name, image }) => (
          <Link className={styles.item} to={`/categories/${id}`} key={id}>
            <div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
            <h3 className={styles.title}>{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
