"use client";
import axios from "axios";
import qs from "query-string";
import { db } from "@/lib/db";
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
import { Loader2 } from "lucide-react";

interface ProfileProps {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  status: string;
  friendRequestId: string;
}

export const AddFriendModal = () => {
  const [loading, setLoading] = useState(false);

  const [emailSearch, setEmailSearch] = useState("");

  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "addFriend";

  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = async (e: any) => {
    setLoading(true);
    if (e.code === "Enter") {
      searchContact();
    }
    setLoading(false);
  };

  const searchContact = async () => {
    setLoading(true);
  
      const url = qs.stringifyUrl({
        url: "/api/profile",
        query: {
          emailProfile: emailSearch,
        },
      });

      const result = await axios.get(url);

      setContacts(result.data?.items);
    
    setLoading(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-white text-black 
      p-0 overflow-hidden w-[400px] transition-all
      dark:bg-gray-800
      "
      >
        <DialogHeader className="pt-5 px-6">
          <DialogTitle className="text-base text-center dark:text-white">Thêm Bạn</DialogTitle>
          <Input
            type="search"
            placeholder="Search contact..."
            className="focus-visible:ring-0 h-[35px] 
                           focus-visible:ring-offset-0
                           dark:bg-gray-600
                           dark:text-white
                           "
            onChange={(e) => setEmailSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="h-60">
            {loading ? (
              <div
                className="h-60 w-full flex items-center
             justify-center 
           "
              >
                <Loader2 className="animate-spin text-zinc-500 w-8 h-8" />{" "}
              </div>
            ) : (
              <div>
                {contacts.length <= 0 ? (
                  <div
                    className="h-60 w-full flex items-center
                  justify-center  dark:text-white
                "
                  >
                    <p>No Data</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col w-full h-full overflow-auto">
                    {contacts.map((value: ProfileProps) => (
                      <ChatItem
                        key={value.id}
                        type="addFriend"
                        nameProfile={value.name}
                        imageUrl={value.imageUrl}
                        email={value.email}
                        id={value.id}
                        status={value.status}
                        friendRequestId={value.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 dark:bg-gray-800 px-6 py-4">
          <Button type="submit" className="bg-gray-400 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700" onClick={() => handleClose()}>
            Hủy
          </Button>
          <Button type="submit" className="bg-blue-600 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700" onClick={() => searchContact()}>
            Tìm Kiếm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
