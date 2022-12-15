import React, { useContext } from "react";
import { IProduct, ProductsContext } from "../../contexts/ProductsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import styled from "@emotion/styled";
import ProductForm, { IValues } from "../../components/ProductForm/ProductForm";
import PageTitle from "../../components/PageTitle/PageTitle";

const initialValues: IValues = {
  sku: "",
  name: "",
  stockTotal: "",
  stockCut: "",
  priceOriginal: "",
  priceDiscount: "",
};

const RegisterProduct = () => {
  const { getSkuList, addItem } = React.useContext(ProductsContext);
  const { setSnack } = useContext(SnackbarContext);

  const handleAdd = (item: IProduct) => {
    addItem(item);
    setSnack({ message: `${item.name} cadastrado com sucesso.`, open: true });
  };

  return (
    <Container>
      <PageTitle title="Cadastrar Produto" />
      <ProductForm
        initialValues={initialValues}
        skuList={getSkuList}
        onSubmit={handleAdd}
        submitLabel="Cadastrar"
      />
    </Container>
  );
};

export default RegisterProduct;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
`;
