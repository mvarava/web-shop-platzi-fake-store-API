import React from 'react';
import Poster from '../Poster/Poster';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';
import Categories from '../Categories/Categories';

const Home = () => {
  const { products, categories } = useSelector((state) => state);

  return (
    <>
      <Poster />
      <Products products={products.productsList} title="Trending" amount={5} />
      <Categories categories={categories.categoriesList} title="Worth Seeing" amount={5} />
    </>
  );
};

export default Home;
