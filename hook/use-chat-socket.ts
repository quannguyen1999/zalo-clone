
import { useSocket } from "@/components/provider/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
}

interface DirectMessage {
    id: string;
    roomId: string;
    content: string;
    fileUrl: string;
    profileId: string;
    deleted: boolean;
  }
  

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey
}: ChatSocketProps) => {
    const {socket} = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        // console.log(socket)
        if(!socket){
            return;
        }

        socket.on(updateKey, (message: DirectMessage) => {
          
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0){
                    return oldData;
                }

                const newData = oldData.pages.map((page: any)=> {
                    return {
                        ...page,
                        items: page.items.map((item: DirectMessage) => {
                            if(item.id === message.id){
                                return message;
                            }
                            return item;
                        })
                    };
                });

                return {
                    ...oldData,
                    pages: newData
                }
            });
        })

        socket.on(addKey, (message: DirectMessage) => {
           
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if(!oldData || !oldData.pages || oldData.pages.length === 0){
                    return {
                        pages: [{
                            items: [message]
                        }]
                    };
                }


                const newData = [...oldData.pages];
                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items,
                    ]
                }
                return {
                    ...oldData,
                    pages: newData
                }
            });
        })

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        }
    },[queryClient, addKey, queryKey, socket, updateKey]);
}