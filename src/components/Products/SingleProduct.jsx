import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productsList, related } = useSelector(({ products }) => products);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || productsList.length) return;

    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data, dispatch, productsList.length]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} title="Related Products" amount={10} />
    </>
  );
};

export default SingleProduct;
