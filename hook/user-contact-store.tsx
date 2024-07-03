import {create} from 'zustand';

interface ContactItemProps {
    icon: any;
    value: string;
    url: string;
}

interface ModalStore {
    data: ContactItemProps[];
    isRefresh: boolean;
    refresh: (data: ContactItemProps[]) => void;
}

export const useContactModal = create<ModalStore>((set) => ({
    data: [],
    isRefresh: false,
    refresh: (data = []) => set({data: data}),
}))