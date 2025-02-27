"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  Table as TTable,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { ReactNode } from "react";
import { useRowSelectionStore } from "@/stores/rowSelectionStore";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  renderTop?: (table: TTable<TData>) => ReactNode;
  renderBottom?: (table: TTable<TData>) => ReactNode;
  tableName?: string;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  tableName,
  renderTop,
  renderBottom,
}: DataTableProps<TData, TValue>) {
  const { selectedRows, setSelectedRows, toggleRowSelection } =
    useRowSelectionStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const rowSelectionState: RowSelectionState = {};
  if (tableName)
    selectedRows[tableName]?.forEach((id) => {
      rowSelectionState[id] = true;
    });

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: !tableName
      ? undefined
      : (updater) => {
          const newRowSelection: RowSelectionState =
            typeof updater === "function"
              ? updater(rowSelectionState)
              : updater;

          setSelectedRows(
            tableName,
            new Set(
              Object.keys(newRowSelection).filter((key) => newRowSelection[key])
            )
          );
        },
    state: {
      sorting,
      columnFilters,
      rowSelection: rowSelectionState,
    },
  });
  return (
    <>
      {renderTop ? renderTop(table) : null}
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-gray-500 text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const isSelected = !tableName
                  ? undefined
                  : selectedRows[tableName]?.has(row.id) || false;
                return (
                  <TableRow
                    key={row.id}
                    data-state={isSelected ? "selected" : undefined}
                    onClick={
                      !tableName
                        ? undefined
                        : () => toggleRowSelection(tableName, row.id)
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {renderBottom ? renderBottom(table) : null}
    </>
  );
}
