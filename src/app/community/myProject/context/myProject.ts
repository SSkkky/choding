import { create } from 'zustand';
import { myProjectPostType } from '@/types/datatype';

interface MyProjectStore {
    result: myProjectPostType[];
    setResult: (item: myProjectPostType[]) => void;
    originalData: myProjectPostType[];
    setOriginalData: (item: myProjectPostType[]) => void;
    totalPostId: number;
    setTotalPostId: (item: number) => void;
}
export const myProjectStore = create<MyProjectStore>(set => ({
    result: [],
    setResult: (result) => set({result}),
    originalData: [],
    setOriginalData: (originalData) => set({originalData}),
    totalPostId: 6,
    setTotalPostId: (totalPostId) => set({totalPostId})
}));
