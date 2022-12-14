import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { formatPrice } from "../../utils/utils";
import TableHead from "./TableHead";
import TableToolbar from "./TableToolBar";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { IProduct } from "../../contexts/ProductsContext";
import { Paper } from "@mui/material";
import { SnackbarContext } from "../../contexts/SnackbarContext";

type Order = "asc" | "desc";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface IProductTableProps {
  rows: IProduct[];
  deleteItems: Function;
}
const ProductTable = ({ rows, deleteItems }: IProductTableProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IProduct>("name");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [selectedItems, setSelectedItems] = useState<IProduct[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { setSnack } = useContext(SnackbarContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleDeleteItems = () => {
    const plural = selected.length > 1;
    deleteItems(selected);
    setDeleteOpen(false);
    setSelected([]);
    setSelectedItems([]);
    setSnack({
      message: plural
        ? `${selected.length} produtos foram deletados.`
        : `${selected.length} produto foi deletado.`,
      open: true,
    });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IProduct
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.sku);
      setSelected(newSelected);
      setSelectedItems(rows);
      return;
    }
    setSelected([]);
    setSelectedItems([]);
  };

  const handleSelect = (event: React.MouseEvent<unknown>, row: IProduct) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(row.sku);
    let newSelected: readonly number[] = [];
    let newSelectedItems: IProduct[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.sku);
      newSelectedItems = newSelectedItems.concat(selectedItems, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectedItems(newSelectedItems);
  };

  const handleClick = (event: React.MouseEvent<unknown>, sku: number) => {
    navigate(`/products/${sku}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (sku: number) => selected.indexOf(sku) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Container elevation={0}>
      <TableToolbar
        numSelected={selected.length}
        handleDeleteItems={() => setDeleteOpen(true)}
      />
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.sku);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(e) => handleClick(e, row.sku)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.sku}
                    selected={isItemSelected}
                    sx={{
                      "&:hover": { cursor: "pointer" },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleSelect(event, row)}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.sku}</TableCell>
                    <TableCell align="right">
                      {row.stockTotal - row.stockCut}
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.priceOriginal)}
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.priceDiscount)}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={"Mostrar"}
        rowsPerPageOptions={[5, 10, 20, 30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteDialog
        items={selectedItems}
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleDelete={handleDeleteItems}
      />
    </Container>
  );
};

export default ProductTable;

const Container = styled(Paper)`
  padding: 1rem;
  border-radius: 1rem;
`;
