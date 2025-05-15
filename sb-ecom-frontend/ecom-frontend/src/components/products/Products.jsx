import React,{ useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useProductFilter from "../../hooks/useProductFilter";
import Pagination from "../shared/Pagination";
import ProductCard from "../shared/ProductCard";
import { fetchCategories } from "../store/actions";
import Filter from "./Filter";
<<<<<<< HEAD:sb-ecom-frontend/ecom-frontend/src/components/products/Products.jsx

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector(
    (state) => state.products
  );
=======
import ProductCard from "./ProductCard";
import { fetchCategories } from "./store/actions";
import useProductFilter from "./useProductFilter";
import Pagination from "./Pagination";

const Products = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { products, categories, pagination } = useSelector((state) => state.products);
>>>>>>> c0fffb0e25311683ddf29b2a5c0281ecb3fc76aa:sb-ecom-frontend/ecom-frontend/src/components/Products.jsx
  const dispatch = useDispatch();
  useProductFilter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      <Filter categories={categories ? categories : []} />
      {isLoading ? (
        <p>It is loading....</p>
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
          {pagination && (
            <Pagination
              numberOfPage={pagination?.totalPages}
              totalProducts={pagination?.totalElements}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Products;