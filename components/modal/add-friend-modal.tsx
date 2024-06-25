'use client'

import { useModal } from "@/hook/user-modal-store";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChatItem } from "../chat/chat-item";

export const AddFriendModal = () => {
  const data = [1,2,3,4,5];

  const { isOpen, onClose, type } = useModal();
  
  const isModalOpen = isOpen && type === "addFriend";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
      <DialogContent className="bg-white text-black 
      p-0 overflow-hidden w-[400px] transition-all">
        <DialogHeader className="pt-5 px-6">
          <DialogTitle className="text-base text-center">
            Thêm Bạn
          </DialogTitle>
          <Input type="search" placeholder="Search contact..." 
                className="focus-visible:ring-0 h-[35px]"/>
          <div className="flex-1 flex flex-col w-full">
            {data.map((value) => (
                <ChatItem key={value} type="addFriend"/>
            ))}
          </div>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <Button type="submit" className="bg-gray-400">
            Hủy
          </Button>
          <Button type="submit" className="bg-blue-600">
            Tìm Kiếm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
