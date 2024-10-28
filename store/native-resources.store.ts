import { create } from 'zustand';

interface State {
  images: string[];

  addImage: (image: string) => void;
}

export const useNativeResourcesStore = create<State>()((set) => ({
  images: [],

  addImage: (image) => {
    set((state) => ({ images: [...state.images, image] }));
  },
}));
