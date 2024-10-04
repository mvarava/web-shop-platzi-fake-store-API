import React, { useState } from 'react';

import styles from '../../styles/User.module.css';

const UserSignUpForm = ({ closeForm }) => {
  const [values, setValues] = useState({ name: '', email: '', password: '', avatar: '' });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Sign Up</div>

      <form className={styles.form}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required></input>
        </div>

        <div className={styles.group}>
          <input
            type="name"
            name="name"
            placeholder="Your name"
            value={values.name}
            autoComplete="off"
            onChange={handleChange}
            required></input>
        </div>

        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required></input>
        </div>

        <div className={styles.group}>
          <input
            type="avatar"
            name="avatar"
            placeholder="Your avatar"
            value={values.avatar}
            autoComplete="off"
            onChange={handleChange}
            required></input>
        </div>

        <div className={styles.link}>I already have an account</div>

        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
