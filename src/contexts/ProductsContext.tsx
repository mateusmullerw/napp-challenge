import React, { createContext, useEffect, useState } from "react";
import { normalizeString } from "../utils/utils";

type Filters = {
  name: string;
  sku: string;
};

const initialFilters: Filters = {
  name: "",
  sku: "",
};

export interface IProduct {
  id: number;
  sku: number;
  name: string;
  stockTotal: number;
  stockCut: number;
  priceOriginal: number;
  priceDiscount: number;
}

const initialProductsData: IProduct[] = [];

type ProductsContextType = {
  loading: boolean;
  filteredData: IProduct[];
  page: number;
  setPage: Function;
  pageSize: number;
  setPageSize: Function;
  filters: Filters;
  setFilters: Function;
  deleteItems: Function;
  numberOfPages: number;
};

const initialValue: ProductsContextType = {
  loading: true,
  filteredData: [],
  page: 1,
  setPage: () => {},
  pageSize: 10,
  setPageSize: () => {},
  filters: initialFilters,
  setFilters: () => {},
  deleteItems: () => {},
  numberOfPages: 1,
};
export const ProductsContext = createContext<ProductsContextType>(initialValue);

type ProductsProviderProps = {
  children: React.ReactNode;
};

const ProductsProvider = (props: ProductsProviderProps) => {
  const [loading, setLoading] = useState(initialValue.loading);
  const [productsData, setProductsData] = useState(initialProductsData);
  const [filteredData, setFilteredData] = useState(initialProductsData);
  const [currentPageData, setCurrentPageData] = useState(initialProductsData);
  const [page, setPage] = useState(initialValue.page);
  const [pageSize, setPageSize] = useState(initialValue.pageSize);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const getProductsData = () => {
    setLoading(true);
    const products = require("../mock/products.json");
    setProductsData(products);
    setLoading(false);
  };

  const deleteItems = (skuList: number[]) => {
    const newProductsData = [...productsData];
    skuList.forEach((sku) => {
      const skuIndex = newProductsData.findIndex((item) => item.sku === sku);
      if (skuIndex > -1) {
        newProductsData.splice(skuIndex, 1);
      }
    });
    setProductsData(newProductsData);
  };

  useEffect(() => {
    getCurrentPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  const getCurrentPageData = () => {
    const firstIndex = (page - 1) * pageSize;
    const lastIndex = firstIndex + pageSize;
    const newPage = filteredData.slice(firstIndex, lastIndex);
    setCurrentPageData(newPage);
  };

  useEffect(() => {
    let newFilteredData = productsData;

    newFilteredData = newFilteredData.filter((item) => {
      let normalizedName = normalizeString(item.name);
      const normalizedFilterName = normalizeString(filters.name);

      if (normalizedName.includes(normalizedFilterName)) {
        return true;
      }

      return false;
    });

    newFilteredData = newFilteredData.filter((item) => {
      let normalizedSku = normalizeString(item.sku.toString());
      const normalizedFilterSku = normalizeString(filters.sku);

      if (normalizedSku.includes(normalizedFilterSku)) {
        return true;
      }

      return false;
    });

    setFilteredData(newFilteredData);
    setPage(1);
  }, [productsData, filters]);

  // useEffect(() => {
  //   if (productsData.length === 0) {
  //     getProductsData();
  //   } else {
  //     getCurrentPageData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, pageSize, productsData.length]);

  useEffect(() => {
    if (productsData.length === 0) {
      getProductsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    loading: loading,
    filteredData: filteredData,
    page: page,
    setPage: setPage,
    pageSize: pageSize,
    setPageSize: setPageSize,
    filters,
    setFilters: setFilters,
    deleteItems: deleteItems,
    numberOfPages: Math.ceil(filteredData.length / pageSize),
  };

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };
