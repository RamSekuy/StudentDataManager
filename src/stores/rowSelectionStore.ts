import { create } from "zustand";

interface RowSelectionState {
  selectedRows: Record<string, Set<string>>;
  setSelectedRows: (tableName: string, rowIds: Set<string>) => void;
  toggleRowSelection: (tableName: string, rowId: string) => void;
  clear: (tableName: string) => void;
}

export const useRowSelectionStore = create<RowSelectionState>((set) => ({
  selectedRows: {},
  clear: (tableName) =>
    set((state) => {
      const newSelectedRows = { ...state.selectedRows };
      delete newSelectedRows[tableName];
      return { selectedRows: newSelectedRows };
    }),
  setSelectedRows: (tableName, rowIds) =>
    set((state) => ({
      selectedRows: { ...state.selectedRows, [tableName]: rowIds },
    })),
  toggleRowSelection: (tableName, rowId) =>
    set((state) => {
      const prevSelected = state.selectedRows[tableName] || new Set<string>();
      const newSelected = new Set(prevSelected);
      console.log(rowId);
      if (newSelected.has(rowId)) {
        newSelected.delete(rowId);
      } else {
        newSelected.add(rowId);
      }
      console.log(newSelected);
      return {
        selectedRows: { ...state.selectedRows, [tableName]: newSelected },
      };
    }),
}));
