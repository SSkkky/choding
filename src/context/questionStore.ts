import { create } from 'zustand';


interface T {
    quiz: { isOpen: boolean, isTest: boolean }
    isOpenFunc: (quizState: { isOpen: boolean, isTest: boolean }) => void
}

export const useQuestion = create<T>((set) => {
    return {
        quiz: { isOpen: false, isTest: false, },
        isOpenFunc: (quizState) => {
            set((state: any) => ({
                quiz: {
                    isOpen: quizState.isOpen,
                    isTest: quizState.isTest,
                }
            }))
        }
    }
});
