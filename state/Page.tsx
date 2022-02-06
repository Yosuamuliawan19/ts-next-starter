import { IElement } from 'types';
import create from 'zustand';

interface Page {
  elements: IElement[];
  background: string;
  selectedElement: Set<unknown>;
  keyToIdxMap: Map<string, number>;
  initialized: boolean;
  setSelectedElement: (any) => void;

  setBackground: (background: string) => void;
  initializePage: (elements: IElement[]) => void;
  addElement: (element: IElement) => void;
  getSelectedElement: () => IElement | undefined;
  editSelectedElement: (any) => void;
  deleteSelectedElement: (any) => void;
}
export const usePage = create(
  (set, get): Page => ({
    elements: [],
    background: '#fff',
    selectedElement: new Set(),
    keyToIdxMap: new Map(),
    initialized: false,

    getSelectedElement: () => {
      const selectedElementArray = Array.from(get().selectedElement);

      return get().elements[get().keyToIdxMap.get(selectedElementArray[0])];
    },

    editSelectedElement: (changes) => {
      const selectedElementArray = Array.from(get().selectedElement);
      const currentElementIdx = get().keyToIdxMap.get(selectedElementArray[0]);
      const currentElement =
        get().elements[get().keyToIdxMap.get(selectedElementArray[0])];
      const elementsArray = get().elements;

      const newElement = {
        ...currentElement,
        ...changes,
      };
      elementsArray[currentElementIdx] = newElement;
      set((state) => ({ elements: elementsArray }));
    },

    deleteSelectedElement: () => {
      const selectedElementArray = Array.from(get().selectedElement);
      const currentElementIdx = get().keyToIdxMap.get(selectedElementArray[0]);
      const currentElement =
        get().elements[get().keyToIdxMap.get(selectedElementArray[0])];
      const elementsArray = get().elements;

      const newElement = {
        ...currentElement,
        type: 'none',
      };
      elementsArray[currentElementIdx] = newElement;
      set((state) => ({ elements: elementsArray, selectedElement: new Set() }));
    },

    addElement: (element: IElement) =>
      set((state) => {
        state.keyToIdxMap.set(12323, state.elements.length + 1);
        return {
          elements: [
            ...state.elements,
            {
              ...element,
              key: 12323,
            },
          ],
        };
      }),
    setBackground: (value) => set((state) => ({ background: value })),
    setSelectedElement: (value: any) =>
      set((state) => ({ selectedElement: value })),
    initializePage: (data) =>
      set((state) => {
        return {
          background: data?.background,
          elements:
            data?.elements?.map((data, idx) => {
              state.keyToIdxMap.set(idx, idx);
              return {
                ...data,
                key: idx,
              };
            }) || [],
        };
      }),
  })
);
