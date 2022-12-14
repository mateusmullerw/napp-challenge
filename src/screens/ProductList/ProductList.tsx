import React from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import ProductTable from "../../components/ProductTable/ProductTable";
import styled from "@emotion/styled";
import { COLORS } from "../../constants/styles";
import { Typography } from "@mui/material";

const ProductList = () => {
  const {
    filteredData,
    page,
    setPage,
    pageSize,
    setPageSize,
    filters,
    setFilters,
    loading,
    numberOfPages,
    deleteItems,
  } = React.useContext(ProductsContext);

  const rows = filteredData.map((item) => {
    return {
      sku: item.sku,
      name: item.name,
      stock: item.stockTotal - item.stockCut,
      priceOriginal: item.priceOriginal,
      priceDiscount: item.priceDiscount,
    };
  });

  return (
    <Container>
      <Typography variant="h5">Produtos</Typography>
      <ProductTable rows={rows} deleteItems={deleteItems} />
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
  background-color: ${COLORS.white};
`;
