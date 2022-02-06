import create from 'zustand';

export const useUI = create((set) => ({
  // auth modal
  preferencesModalVisible: false,
  openPreferencesModal: () =>
    set((state) => ({ preferencesModalVisible: true })),
  setVisiblePreferencesModal: (value) =>
    set((state) => ({ preferencesModalVisible: value })),
}));
