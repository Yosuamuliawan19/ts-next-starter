import create from 'zustand';

export const useUI = create((set) => ({
  // global
  isScrolling: false,
  setIsScrolling: (value) => set((state) => ({ isScrolling: value })),

  isDragging: false,
  setIsDragging: (value) => set((state) => ({ isDragging: value })),

  // auth modal
  preferencesModalVisible: false,
  openPreferencesModal: () =>
    set((state) => ({ preferencesModalVisible: true })),
  setVisiblePreferencesModal: (value) =>
    set((state) => ({ preferencesModalVisible: value })),

  // upgradeModal modal
  upgradeModalVisible: false,
  openUpgradeModal: () => set((state) => ({ upgradeModalVisible: true })),
  setVisibleUpgradeModal: (value) =>
    set((state) => ({ upgradeModalVisible: value })),

  // auth modal
  isPreviewMode: false,
  openPreviewMode: () => set((state) => ({ isPreviewMode: true })),
  closePreviewMode: (value) => set((state) => ({ isPreviewMode: false })),

  // auth modal
  sideBarVisible: false,
  openSideBar: () => set((state) => ({ sideBarVisible: true })),
  closeSidebar: (value) => set((state) => ({ sideBarVisible: false })),
  setVisibleSidebar: (value) => set((state) => ({ sideBarVisible: value })),
}));
