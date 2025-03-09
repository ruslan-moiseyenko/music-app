import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  TablePagination
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Column, SortConfig, SortDirection } from "../../types/song.types";

interface SmartTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column[];
  title?: string;
  isLoading?: boolean;
  showFavorites?: boolean;
  favoriteIds?: string[];
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

export function SmartTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  isLoading = false,
  showFavorites = false,
  favoriteIds = [],
  onFavoriteToggle
}: SmartTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: columns[0]?.id as any,
    direction: "asc"
  });
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: any) => {
    const isAsc = sortConfig.key === property && sortConfig.direction === "asc";
    setSortConfig({
      key: property,
      direction: isAsc ? "desc" : "asc"
    });
  };

  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedData, page, rowsPerPage]);

  const getSortDirection = (column: string): SortDirection | false => {
    return sortConfig.key === column ? sortConfig.direction : false;
  };

  const handleFavoriteClick = (id: string) => {
    if (onFavoriteToggle) {
      const isFavorite = favoriteIds.includes(id);
      onFavoriteToggle(id, !isFavorite);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {title && (
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {isLoading && <CircularProgress size={24} />}
        </Box>
      )}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id as string}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={sortConfig.key === column.id}
                    direction={getSortDirection(column.id as string) || "asc"}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}

              {showFavorites && (
                <TableCell align="center" style={{ minWidth: 80 }}>
                  Favorite
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showFavorites ? 1 : 0)}
                  align="center"
                >
                  <CircularProgress size={40} sx={{ my: 2 }} />
                </TableCell>
              </TableRow>
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showFavorites ? 1 : 0)}
                  align="center"
                >
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id || index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id as string}
                          align={column.align}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}

                    {showFavorites && (
                      <TableCell align="center">
                        <Tooltip
                          title={
                            favoriteIds.includes(row.id)
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                        >
                          <IconButton
                            color="primary"
                            onClick={() => handleFavoriteClick(row.id)}
                            size="small"
                          >
                            {favoriteIds.includes(row.id) ? (
                              <Favorite color="error" />
                            ) : (
                              <FavoriteBorder />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count}`
        }
      />
    </Paper>
  );
}
