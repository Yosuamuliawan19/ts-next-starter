import { syncPageData } from '@api/';
import { showErrorMsg, showSuccessMsg } from '@helpers/feedback';
import { RefObject } from 'react';
import { IElement, IPage } from 'types';
import create from 'zustand';
import { ELEMENT_TYPES } from '@constants';

interface PageState {
  url: string;
  elements: IElement[];
  background: string;
  selectedElement: Set<string>;
  selectedElementRef: RefObject<any> | null;
  keyToIdxMap: Map<string, number>;
  initialized: boolean;
  getElement: (key: string) => IElement;
  setSelectedElement: (id: any) => void;
  setSelectedElementRef: (id: any) => void;
  deselectAllElements: () => void;

  setBackground: (background: string) => void;
  initializePage: (page: IPage) => void;
  addElement: (element: IElement) => void;
  duplicateElement: (element: IElement) => void;
  getSelectedElement: () => IElement | undefined;
  editSelectedElement: (properties: any) => void;

  savePage: () => Promise<void>;

  // bounding box
  boundingBoxX: number;
  boundingBoxY: number;
  boundingBoxHeight: number;
  boundingBoxWidth: number;

  // internal tracking
  maxZIndex: number;
  minZIndex: number;
  pageHeight: number;
  xAlignments: Map<number, number>;
  yAlignments: Map<number, number>;
  updateInternalTracking: (
    element: IElement,
    previousElement?: IElement
  ) => void;

  // keyboard handlers
  copySelectedElement: () => void;
  pasteSelectedElement: () => void;
  deleteSelectedElement: () => void;
}

export const usePage = create<PageState>(
  (set, get): PageState => ({
    // saveable
    url: '',
    elements: [],
    background: '#fff',
    setBackground: (value) => set({ background: value }),

    // editor state
    selectedElement: new Set(),
    selectedElementRef: null,
    keyToIdxMap: new Map(),
    initialized: false,

    // bounding box tracking
    boundingBoxX: 0,
    boundingBoxY: 0,
    boundingBoxHeight: 0,
    boundingBoxWidth: 0,

    // internal tracking of page
    maxZIndex: 0,
    minZIndex: 0,
    pageHeight: 0,
    xAlignments: new Map(),
    yAlignments: new Map(),
    updateInternalTracking: (element, previousElement) => {
      const state = get();
      const newHeight = element.pos.y + element.size.height;
      function substractOrDelete(map, key) {
        if (!map.has(key)) return;
        const value = map.get(key);
        value === 1 ? map.delete(key) : map.set(key, value - 1);
      }
      function addOrSet(map, key) {
        if (!map.has(key)) {
          map.set(key, 1);
          return;
        }
        const value = map.get(key);
        map.set(key, value + 1);
      }
      if (previousElement) {
        substractOrDelete(state.xAlignments, previousElement.pos.x);
        substractOrDelete(state.yAlignments, previousElement.pos.y);
        substractOrDelete(
          state.xAlignments,
          previousElement.pos.x + previousElement.size.width
        );
        substractOrDelete(
          state.yAlignments,
          previousElement.pos.y + previousElement.size.height
        );
      }
      addOrSet(state.xAlignments, element.pos.x);
      addOrSet(state.yAlignments, element.pos.y);
      addOrSet(state.xAlignments, element.pos.x + element.size.width);
      addOrSet(state.yAlignments, element.pos.y + element.size.height);
      set({
        maxZIndex: Math.max(state.maxZIndex, element.pos.z),
        minZIndex: Math.min(state.minZIndex, element.pos.z),
        pageHeight: Math.max(state.pageHeight, newHeight ? newHeight : 0),
      });
    },

    // selection
    setSelectedElementRef: (ref) => {
      set((state) => (state.selectedElementRef = ref));
    },
    setSelectedElement: (values: string[]) => {
      set({ selectedElement: new Set(values) });
    },
    deselectAllElements: () => {
      set({ selectedElement: new Set() });
    },
    getSelectedElement: () => {
      if (!get().selectedElementRef) return undefined;
      const selectedElementArray = Array.from(get().selectedElement);
      const index = get().keyToIdxMap.get(selectedElementArray[0]) as number;
      return get().elements[index];
    },
    getElement: (elementKey) => {
      const index = get().keyToIdxMap.get(elementKey) as number;
      return get().elements[index];
    },
    editSelectedElement: (changes) => {
      const selectedElementArray = Array.from(get().selectedElement);
      const index = get().keyToIdxMap.get(selectedElementArray[0]) as number;
      const selectedElement = get().elements[index];
      const previousElement = cloneObject(selectedElement);

      const elementsArray = get().elements;
      const newElement = {
        ...selectedElement,
        ...changes,
      };
      elementsArray[index] = newElement;
      get().updateInternalTracking(newElement, previousElement);
      set({ elements: elementsArray });
    },
    deleteSelectedElement: () => {
      get().editSelectedElement({ type: 'none' });
      get().deselectAllElements();
    },
    copySelectedElement: () => {
      const element = get().getSelectedElement();
      navigator.clipboard.writeText(JSON.stringify(element));
      showSuccessMsg('Copied to clipboard');
    },
    pasteSelectedElement: async () => {
      const elementString = await navigator.clipboard.readText();
      const element = JSON.parse(elementString);
      get().addElement(element);
      showSuccessMsg('Pasted from clipboard');
    },

    addElement: (element: IElement) => {
      const key = get().elements.length + 1;
      get().keyToIdxMap.set(get().url + key.toString(), key);
      get().updateInternalTracking(element);
      const newElement = {
        ...element,
        pos: { ...element.pos, z: get().maxZIndex + 1 },
        key: get().url + key.toString(),
      };
      set({
        elements: [...get().elements, newElement],
      });
    },

    duplicateElement: () => {
      const element = cloneObject(get().getSelectedElement());
      element.pos.x += 12;
      element.pos.y += 12;
      delete element.key;
      get().addElement(element);
    },

    initializePage: (page) => {
      set({
        maxZIndex: 0,
        minZIndex: 0,
        pageHeight: 0,
        xAlignments: new Map(),
        yAlignments: new Map(),
      });
      let counter = 0;
      const elements = page?.elements
        ?.map((data) => {
          if (data.type === ELEMENT_TYPES.NONE) return;
          const key = counter;
          counter++;
          get().keyToIdxMap.set(page.url + key.toString(), key);
          get().updateInternalTracking(data);
          return {
            ...data,
            key: page.url + key.toString(),
          };
        })
        .filter(Boolean);

      set((state) => {
        return {
          url: page?.url,
          background: page?.background,
          elements,
        };
      });
    },

    savePage: async () => {
      const payload = {
        url: get().url,
        background: get().background,
        elements: get().elements.map((element) => {
          const current = Object.assign({}, element);
          delete current['key'];
          return current;
        }),
      };
      try {
        await syncPageData(payload);
        showSuccessMsg('Succesfully saved page');
      } catch (e) {
        showErrorMsg('Failed saving page ' + e?.message);
      }
    },
  })
);

function cloneObject(obj) {
  const clone: any = {};
  for (const i in obj) {
    if (obj[i] != null && typeof obj[i] == 'object')
      clone[i] = cloneObject(obj[i]);
    else clone[i] = obj[i];
  }
  return clone;
}
