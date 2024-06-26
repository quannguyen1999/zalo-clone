'use client'
import axios from 'axios';
import qs from 'query-string';
import {db} from '@/lib/db';
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
import { useState } from "react";


interface ProfileProps {
  id: string 
  userId: string
  name: string 
  imageUrl: string 
  email: string 
}

export const AddFriendModal = () => {

  const [emailSearch, setEmailSearch] = useState("");

  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, type } = useModal();
  
  const isModalOpen = isOpen && type === "addFriend";

  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = async (e: any) => {
    if (e.code === "Enter") {
      const url = qs.stringifyUrl({
          url: '/api/profile',
          query: {
            emailProfile: emailSearch
        }
      })
      
      const result = await axios.get(url);

      setContacts(result.data?.items);
    }
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
                className="focus-visible:ring-0 h-[35px] 
                           focus-visible:ring-offset-0"
                onChange={(e) => setEmailSearch(e.target.value)}
                onKeyDown={handleKeyDown}
          />
          <div className="h-60">
            <div className="flex-1 flex flex-col w-full h-full overflow-auto">
              {contacts.map((value: ProfileProps) => (
                  <ChatItem key={value.id} type="addFriend" 
                      nameProfile={value.name} 
                      imageUrl={value.imageUrl}
                      email={value.email}
                      />
              ))}
            </div>
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
