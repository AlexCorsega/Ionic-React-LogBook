import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridPaginationModel,
  GridRowHeightParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import generateGuid from "../helpers/generateGuid";
import {
  Box,
  Container,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MuiTable,
  TableBody,
} from "@mui/material";
import useUpdateEffect from "../customHooks/useUpdateEffect";

interface Props {
  columnHeaders: {
    field: string;
    header: string;
    width?: number;
    renderCell?: (params: any) => React.JSX.Element;
  }[];
  rowData: any[];
  height?: number;
  rowHeight?: number;
  pageOptions?: number[];
  className?: string;
  totalDataCount: number;
  rowAutoHeight?: boolean;
  onRowClick?: (e: any) => void;
  onPageSizeChanged?: (model: GridPaginationModel) => void;
}

function Table({
  pageOptions,
  onPageSizeChanged,
  columnHeaders,
  rowData,
  totalDataCount,
  className,
  height,
  rowHeight,
  rowAutoHeight,
  onRowClick,
}: Props): any {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<GridColDef[]>(
    columnHeaders.map((header) => {
      return {
        field: header.field,
        headerName: header.header,
        renderCell: header.renderCell,
        disableColumnMenu: true,
        width:
          header.width == null
            ? getParentDivWidth() / columnHeaders.length
            : header.width,
      };
    })
  );

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      setColumns((col) => {
        const width = getParentDivWidth() / columnHeaders.length;
        col.map((d) => {
          d.width = width;
          return d;
        });
        return [...col];
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  function handlePaginationChange(model: GridPaginationModel) {
    if (onPageSizeChanged) {
      const newModel = { pageSize: model.pageSize, page: model.page + 1 };
      onPageSizeChanged(newModel);
    }
  }
  function getParentDivWidth(): number {
    const width =
      parentDivRef.current == null
        ? window.innerWidth
        : parentDivRef.current?.clientWidth - 20;
    return width ?? 0;
  }
  try {
    return (
      <>
        {/* {rowData && (
        <TableContainer
          component={Paper}
          style={{ height: 400, width: "100%" }}
        >
          <MuiTable sx={{ height: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((col, index) => {
                  return <TableCell key={index}>{col.headerName}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((data, i) => {
                return (
                  <TableRow key={i}>
                    {columns.map((col, index) => {
                      return (
                        <TableCell key={index}>
                          {!col.renderCell && <>{data[`${col.field}`]}</>}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      )} */}
        {(!rowData || rowData.length == 0) && (
          <TableContainer
            component={Paper}
            style={{ height: 400, width: "100%" }}
          >
            <MuiTable sx={{ height: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((col, index) => {
                    return <TableCell key={index}>{col.headerName}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={100}>
                    <h5 className="text-center">No results found.</h5>
                  </TableCell>
                </TableRow>
              </TableBody>
            </MuiTable>
          </TableContainer>
        )}
        {/* {rowData && rowData.length == 0 && (
        <TableContainer
          component={Paper}
          style={{ height: 400, width: "100%" }}
        >
          <MuiTable sx={{ height: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((col, index) => {
                  return <TableCell key={index}>{col.headerName}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={100}>
                  <h5 className="text-center">No results found.</h5>
                </TableCell>
              </TableRow>
            </TableBody>
          </MuiTable>
        </TableContainer>
      )} */}
        {rowData && rowData.length > 0 && (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              minHeight: 200,
            }}
            className={className}
          >
            <DataGrid
              getRowHeight={(e) => {
                if (rowAutoHeight == null || !rowAutoHeight) return undefined;
                return "auto";
              }}
              onRowClick={(e) => {
                if (onRowClick) onRowClick(e);
              }}
              rowSelection
              rowHeight={rowHeight ?? 40}
              rows={rowData.length === 0 ? [{ id: 0 }] : rowData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={pageOptions ?? [5, 10, 15]}
              rowCount={totalDataCount ?? 0}
              paginationMode="server"
              pagination
              onPaginationModelChange={handlePaginationChange}
            />
          </Box>
        )}
      </>
    );
  } catch (error) {
    return Table({
      pageOptions,
      onPageSizeChanged,
      columnHeaders,
      rowData,
      totalDataCount,
      className,
      height,
    });
  }
}

export default Table;
