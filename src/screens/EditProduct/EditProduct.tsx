import { useState, useContext, useEffect } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import styled from "@emotion/styled";
import ProductForm, { IValues } from "../../components/ProductForm/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Button, Paper, Typography } from "@mui/material";

const EditProduct = () => {
  const { getBySku, skuList, deleteItems, editItem } =
    useContext(ProductsContext);
  const { setSnack } = useContext(SnackbarContext);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { sku } = useParams();
  const navigate = useNavigate();

  const numberSku = sku && parseInt(sku);

  let selectedItem = getBySku(numberSku);

  const index = numberSku ? skuList.indexOf(numberSku) : -1;
  if (index !== -1) {
    skuList.splice(index, 1);
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

  const handleGoToProducts = () => {
    navigate(`/products`);
  };

  return (
    <Container>
      <PageTitle title="Editar Produto" showBackArrow />
      {selectedItem ? (
        <>
          <ProductForm
            initialValues={selectedItem}
            skuList={skuList}
            onSubmit={onSubmit}
            submitLabel="Salvar"
            negativeLabel="Deletar"
            handleNegative={() => setDeleteOpen(true)}
          />
          <DeleteDialog
            items={[selectedItem]}
            open={deleteOpen}
            handleClose={() => setDeleteOpen(false)}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        <Fallback>
          <Typography variant="h6">{`Nenhum produto com SKU ${numberSku}`}</Typography>
          <Button onClick={handleGoToProducts} variant="contained">
            Pesquisar na lista
          </Button>
        </Fallback>
      )}
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

const Fallback = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
`;
