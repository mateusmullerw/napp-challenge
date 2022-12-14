import React from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import ProductTable from "../../components/ProductTable/ProductTable";
import styled from "@emotion/styled";
import { COLORS } from "../../constants/styles";
import PageTitle from "../../components/PageTitle/PageTitle";

const ProductList = () => {
  const { filteredData, deleteItems } = React.useContext(ProductsContext);

  return (
    <Container>
      <PageTitle title="Produtos" />
      <ProductTable rows={filteredData} deleteItems={deleteItems} />
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
