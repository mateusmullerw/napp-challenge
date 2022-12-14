import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { COLORS } from "../../constants/styles";
import { Button, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { formatPrice } from "../../utils/utils";
import { TextField } from "@mui/material";
export interface IValues {
  sku: number | "";
  name: string;
  stockTotal: number | "";
  stockCut: number | "";
  priceOriginal: number | "";
  priceDiscount: number | "";
}

interface IProductFormProps {
  initialValues: IValues;
  skuList: number[];
  onSubmit: Function;
  submitLabel: string;
  negativeLabel?: string;
  handleNegative?: React.MouseEventHandler<HTMLButtonElement>;
}

const ProductForm = (props: IProductFormProps) => {
  const {
    initialValues,
    onSubmit,
    skuList,
    submitLabel,
    negativeLabel,
    handleNegative,
  } = props;

  const registerFormValidator = Yup.object().shape({
    sku: Yup.number()
      .notOneOf(skuList, "Este SKU já está cadastrado.")
      .required("Este campo é obrigatório."),
    name: Yup.string().required("Este campo é obrigatório."),
    stockTotal: Yup.number()
      .min(1, "O valor deve ser maior que zero.")
      .required("Este campo é obrigatório."),
    stockCut: Yup.number()
      .lessThan(
        Yup.ref("stockTotal"),
        "O estoque de corte deve ser menor que o estoque total."
      )
      .required("Este campo é obrigatório."),
    priceOriginal: Yup.number().required("Este campo é obrigatório."),
    priceDiscount: Yup.number()
      .lessThan(
        Yup.ref("priceOriginal"),
        "O preço de desconto deve ser menor que o original."
      )
      .required("Este campo é obrigatório."),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: registerFormValidator,
    onSubmit: (values: IValues, actions: FormikHelpers<IValues>) => {
      setTimeout(() => {
        onSubmit(values);
        actions.setSubmitting(false);
        actions.resetForm();
        setCurrentPriceField("");
        setCustomPrice(0);
      }, 800);
    },
  });

  const {
    handleSubmit,
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    setFieldValue,
  } = formik;

  const [customPrice, setCustomPrice] = useState(0);
  const [currentPriceField, setCurrentPriceField] = useState("");

  useEffect(() => {
    setFieldValue(currentPriceField, customPrice);
  }, [currentPriceField, customPrice, setFieldValue]);

  function maskPrice(price: number) {
    if (isNaN(price)) {
      setCustomPrice(0);
    } else {
      setCustomPrice(price);
    }
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormSection>
        <Typography variant="body1">Produto</Typography>
        <TextField
          id="sku"
          name="sku"
          label="SKU"
          type="number"
          variant="outlined"
          helperText={touched.sku && errors.sku ? errors.sku : ""}
          error={touched.sku && !!errors.sku}
          value={values.sku}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          helperText={touched.name && errors.name ? errors.name : ""}
          error={touched.name && !!errors.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormSection>
      <FormSection>
        <Typography variant="body1">Estoque</Typography>
        <TextField
          id="stock-total"
          name="stockTotal"
          label="Estoque Total"
          type="number"
          variant="outlined"
          helperText={
            touched.stockTotal && errors.stockTotal ? errors.stockTotal : ""
          }
          error={touched.stockTotal && !!errors.stockTotal}
          value={values.stockTotal}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          id="stock-cut"
          name="stockCut"
          label="Estoque de corte"
          type="number"
          variant="outlined"
          helperText={
            touched.stockCut && errors.stockCut ? errors.stockCut : ""
          }
          error={touched.stockCut && !!errors.stockCut}
          value={values.stockCut}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          id="stock-available"
          name="stockAvailable"
          label="Estoque disponível"
          type="number"
          disabled
          variant="outlined"
          value={
            values.stockTotal && values.stockCut
              ? values.stockTotal - values.stockCut
              : ""
          }
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormSection>
      <FormSection>
        <Typography variant="body1">Preço</Typography>
        <TextField
          id="price-original"
          name="priceOriginal"
          label="Preço de"
          variant="outlined"
          helperText={
            touched.priceOriginal && errors.priceOriginal
              ? errors.priceOriginal
              : ""
          }
          error={touched.priceOriginal && !!errors.priceOriginal}
          value={
            values.priceOriginal === "" ? "" : formatPrice(values.priceOriginal)
          }
          onChange={(e) => {
            setCurrentPriceField("priceOriginal");
            maskPrice(parseInt(e.target.value.replace(/\D/g, "")));
          }}
          onBlur={handleBlur}
        />
        <TextField
          id="price-discount"
          name="priceDiscount"
          label="Preço por"
          variant="outlined"
          helperText={
            touched.priceDiscount && errors.priceDiscount
              ? errors.priceDiscount
              : ""
          }
          error={touched.priceDiscount && !!errors.priceDiscount}
          value={
            values.priceDiscount === "" ? "" : formatPrice(values.priceDiscount)
          }
          onChange={(e) => {
            setCurrentPriceField("priceDiscount");
            maskPrice(parseInt(e.target.value.replace(/\D/g, "")));
          }}
          onBlur={handleBlur}
        />
      </FormSection>
      <Button
        disabled={isSubmitting}
        type="submit"
        variant="contained"
        size="large"
      >
        {submitLabel}
      </Button>
      {negativeLabel && handleNegative && (
        <Button onClick={handleNegative} size="large" color="error">
          {negativeLabel}
        </Button>
      )}
    </Form>
  );
};

export default ProductForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 1rem;
  background-color: ${COLORS.background};
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;

  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`;
