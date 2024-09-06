import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/Header.modue.css';

import { ROUTES } from '../../utils/routes';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}></Link>
      </div>
    </div>
  );
};

export default Header;
