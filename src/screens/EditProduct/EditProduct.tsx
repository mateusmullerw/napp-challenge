import React, { useState, useContext } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import styled from "@emotion/styled";
import ProductForm, { IValues } from "../../components/ProductForm/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import PageTitle from "../../components/PageTitle/PageTitle";

const EditProduct = () => {
  const { getBySku, getSkuList, deleteItems, editItem } =
    useContext(ProductsContext);
  const { setSnack } = useContext(SnackbarContext);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { sku } = useParams();
  const navigate = useNavigate();

  const numberSku = sku && parseInt(sku);

  let selectedItem = getBySku(numberSku);

  const index = numberSku ? getSkuList.indexOf(numberSku) : -1;
  if (index !== -1) {
    getSkuList.splice(index, 1);
  }

  const onSubmit = (item: IValues) => {
    setSnack({ message: `${item.name} editado com sucesso.`, open: true });
    editItem(numberSku, item);
    selectedItem = item;
    if (numberSku !== item.sku) {
      navigate(`/products/${item.sku}`);
    }
  };

  const handleDelete = () => {
    deleteItems([numberSku]);
    setSnack({ message: `${selectedItem.name} foi deletado.`, open: true });
    navigate(`/products`);
  };

  return (
    <Container>
      <PageTitle title="Editar Produto" showBackArrow />
      {selectedItem && (
        <>
          <ProductForm
            initialValues={selectedItem}
            skuList={getSkuList}
            onSubmit={onSubmit}
            submitLabel="Salvar"
            negativeLabel="Deletar"
            handleNegative={() => setDeleteOpen(true)}
          />
        </>
      )}
      <DeleteDialog
        items={[selectedItem]}
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default EditProduct;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
`;
