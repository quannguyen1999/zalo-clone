import {create} from 'zustand';

interface ProfileProps {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    status: string;
    friendRequestId: string;
    conversationId: string;
    latestMessage: string;
  }

interface ModalStore {
    data: ProfileProps[];
    isRefresh: boolean;
    setData: (data: ProfileProps[]) => void;
    setRefresh: (value: boolean) => void;
}

export const useContactModal = create<ModalStore>((set) => ({
    data: [],
    isRefresh: true,
    setData: (data = []) => set({data: data}),
    setRefresh: (value = false) => set({isRefresh: value}),
}))