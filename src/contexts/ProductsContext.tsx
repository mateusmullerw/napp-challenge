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
  filters: Filters;
  setFilters: Function;
  addItem: Function;
  editItem: Function;
  deleteItems: Function;
  getSkuList: number[];
  getBySku: Function;
};

const initialValue: ProductsContextType = {
  loading: true,
  filteredData: [],
  filters: initialFilters,
  setFilters: () => {},
  addItem: () => {},
  editItem: () => {},
  deleteItems: () => {},
  getSkuList: [],
  getBySku: () => {},
};
export const ProductsContext = createContext<ProductsContextType>(initialValue);

type ProductsProviderProps = {
  children: React.ReactNode;
};

const ProductsProvider = (props: ProductsProviderProps) => {
  const [loading, setLoading] = useState(initialValue.loading);
  const [productsData, setProductsData] = useState(initialProductsData);
  const [skuList, setSkuList] = useState<number[]>([]);
  const [filteredData, setFilteredData] = useState(initialProductsData);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const getProductsData = () => {
    setLoading(true);
    const products = require("../mock/products.json");
    setProductsData(products);
    setLoading(false);
  };

  const getSkuList = skuList;

  const getBySku = (sku: number) => {
    const skuIndex = productsData.findIndex((item) => item.sku === sku);
    return productsData[skuIndex];
  };

  const addItem = (item: IProduct) => {
    setProductsData([...productsData, item]);
  };

  const editItem = (oldSku: number, item: IProduct) => {
    const newProductsData = [...productsData];
    const skuIndex = newProductsData.findIndex((item) => item.sku === oldSku);
    if (skuIndex > -1) {
      newProductsData.splice(skuIndex, 1);
    }

    setProductsData([...newProductsData, item]);
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
  }, [productsData, filters]);

  useEffect(() => {
    if (productsData.length === 0) {
      getProductsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSkuList(productsData.map((item) => item.sku));
  }, [productsData]);

  const value = {
    loading: loading,
    filteredData: filteredData,
    filters,
    setFilters: setFilters,
    addItem: addItem,
    editItem: editItem,
    deleteItems: deleteItems,
    getSkuList: getSkuList,
    getBySku: getBySku,
  };

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };
