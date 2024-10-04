import React from 'react';

import styles from '../../styles/Home.module.css';

import bannerImg from '../../img/banner.png';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.left}>
        <p className={styles.content}>
          NEW YEAR <span>SALE</span>
        </p>
        <button className={`${styles.more} ${styles.button}`}>See more</button>
      </div>

      <div className={styles.right} style={{ backgroundImage: `url(${bannerImg})` }}>
        <p className={styles.discount}>
          save up to <span>50%</span>
        </p>
      </div>
    </section>
  );
};

export default Banner;
