import React from 'react';
import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Home = () => {
  const { productsList } = useSelector(({ products }) => products);

  return (
    <>
      <Poster />
      <Products products={productsList} title="Trending" amount={5} />
    </>
  );
};

export default Home;
