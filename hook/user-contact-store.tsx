import {create} from 'zustand';

interface ContactItemProps {
    icon: any;
    value: string;
    url: string;
}

interface ModalStore {
    data: ContactItemProps[];
    isRefresh: boolean;
    setData: (data: ContactItemProps[]) => void;
    setRefresh: (value: boolean) => void;
}

export const useContactModal = create<ModalStore>((set) => ({
    data: [],
    isRefresh: false,
    setData: (data = []) => set({data: data}),
    setRefresh: (value = false) => set({isRefresh: false}),
}))