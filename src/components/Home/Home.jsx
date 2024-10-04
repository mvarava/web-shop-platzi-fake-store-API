import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';

import { filterByPrice } from '../../features/products/productsSlice';

const Home = () => {
  const dispatch = useDispatch();

  const {
    products: { productsList, filtered },
    categories,
  } = useSelector((state) => state);

  useEffect(() => {
    if (!productsList.length) return;

    dispatch(filterByPrice(100));
  }, [dispatch, productsList.length]);

  return (
    <>
      <Poster />
      <Products products={productsList} title="Trending" amount={5} />
      <Categories categories={categories.categoriesList} title="Worth Seeing" amount={5} />
      <Banner />
      <Products products={filtered} title="Less than 100$" amount={5} />
    </>
  );
};

export default Home;
