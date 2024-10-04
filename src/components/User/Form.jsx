// src/components/Form.jsx

import React, { useState } from 'react';
import styles from '../../styles/User.module.css';

export const Form = ({
  closeForm,
  title,
  fields,
  onSubmit,
  linkText,
  linkAction,
  submitButtonText,
}) => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);

  const handleChange = ({ target: { value, name } }) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val.trim() !== '');
    if (!isNotEmpty) return;

    console.log(values);
    onSubmit(values);
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>{title}</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className={styles.group} key={field.name}>
            <input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={values[field.name]}
              autoComplete="off"
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}

        {linkText && linkAction && (
          <div className={styles.link} onClick={linkAction}>
            {linkText}
          </div>
        )}

        <button type="submit" className={styles.submit}>
          {submitButtonText || title}
        </button>
      </form>
    </div>
  );
};
