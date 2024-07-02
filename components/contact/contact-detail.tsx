"use client";
import {
  Annoyed,
  BookUser,
  CircleOff,
  Loader2,
  Plus,
  SmileIcon,
  Users,
} from "lucide-react";
import ContactItem from "./contact-item";
import { ProfilerProps, useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import qs from "query-string";
import { ChatItem } from "../chat/chat-item";

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

// const contactApproves: ProfileProps[] = [
//   {
//     id: "1",
//     userId: "asd",
//     name: "asd",
//     imageUrl:
//       "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//     email: "asd",
//     status: "receivedRequest",
//     friendRequestId: "asd",
//     conversationId: "asd",
//     latestMessage: "abc",
//   },
//   {
//     id: "1",
//     userId: "asd",
//     name: "asd",
//     imageUrl:
//       "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//     email: "asd",
//     status: "receivedRequest",
//     friendRequestId: "asd",
//     conversationId: "asd",
//     latestMessage: "abc",
//   },
//   {
//     id: "1",
//     userId: "asd",
//     name: "asd",
//     imageUrl:
//       "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//     email: "asd",
//     status: "receivedRequest",
//     friendRequestId: "asd",
//     conversationId: "asd",
//     latestMessage: "abc",
//   },
//   {
//     id: "1",
//     userId: "asd",
//     name: "asd",
//     imageUrl:
//       "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//     email: "asd",
//     status: "receivedRequest",
//     friendRequestId: "asd",
//     conversationId: "asd",
//     latestMessage: "abc",
//   },
//   {
//     id: "1",
//     userId: "asd",
//     name: "asd",
//     imageUrl:
//       "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//     email: "asd",
//     status: "receivedRequest",
//     friendRequestId: "asd",
//     conversationId: "asd",
//     latestMessage: "abc",
//   },
//   {
//     id: "1",
//     userId: "asd",
//     name: "asd",
//     imageUrl:
//       "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//     email: "asd",
//     status: "receivedRequest",
//     friendRequestId: "asd",
//     conversationId: "asd",
//     latestMessage: "abc",
//   },
// ];

// const contactRequests: ProfileProps[] = [
//     {
//       id: "1",
//       userId: "asd",
//       name: "asd",
//       imageUrl:
//         "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//       email: "asd",
//       status: "pending",
//       friendRequestId: "asd",
//       conversationId: "asd",
//       latestMessage: "abc",
//     },
//     {
//       id: "1",
//       userId: "asd",
//       name: "asd",
//       imageUrl:
//         "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//       email: "asd",
//       status: "pending",
//       friendRequestId: "asd",
//       conversationId: "asd",
//       latestMessage: "abc",
//     },
//     {
//       id: "1",
//       userId: "asd",
//       name: "asd",
//       imageUrl:
//         "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//       email: "asd",
//       status: "pending",
//       friendRequestId: "asd",
//       conversationId: "asd",
//       latestMessage: "abc",
//     },
//     {
//       id: "1",
//       userId: "asd",
//       name: "asd",
//       imageUrl:
//         "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//       email: "asd",
//       status: "pending",
//       friendRequestId: "asd",
//       conversationId: "asd",
//       latestMessage: "abc",
//     },
//     {
//       id: "1",
//       userId: "asd",
//       name: "asd",
//       imageUrl:
//         "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//       email: "asd",
//       status: "pending",
//       friendRequestId: "asd",
//       conversationId: "asd",
//       latestMessage: "abc",
//     },
//     {
//       id: "1",
//       userId: "asd",
//       name: "asd",
//       imageUrl:
//         "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg",
//       email: "asd",
//       status: "pending",
//       friendRequestId: "asd",
//       conversationId: "asd",
//       latestMessage: "abc",
//     },
//   ];

export const ContactDetail = () => {
  const [contactApprove, setContactApprove] = useState([]);

  const [contactRequest, setContactRequest] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadListFriendApprove = async () => {
      setLoading(true);

      //Approve
      const urlApprove = qs.stringifyUrl({
        url: "/api/profile/list-friend-request",
        query: {
          type: "approve",
        },
      });

      const resultApprove = await axios.get(urlApprove);

      setContactApprove(resultApprove.data?.items);

      //Request
      const urlRequest = qs.stringifyUrl({
        url: "/api/profile/list-friend-request",
        query: {
          type: "request",
        },
      });

      const resultRequest = await axios.get(urlRequest);

      setContactRequest(resultRequest.data?.items);

      setLoading(false);
    };

    loadListFriendApprove();
  }, []);

  return (
    <>
      {!loading ? (
        <div className="h-full overflow-auto flex flex-col pl-5 bg-gray-50">
          <div>
            <h1>Chờ Chấp Nhận</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactApprove.map((value: ProfileProps) => (
              <ChatItem
                key={value.id}
                type="addFriend"
                nameProfile={value.name}
                imageUrl={value.imageUrl}
                email={value.email}
                id={value.id}
                status={value.status}
                friendRequestId={value.friendRequestId}
              />
            ))}
           
          </div>
          {contactApprove.length <= 0 && (
              <div className="flex flex-col justify-center items-center w-full h-80 gap-2">
                <div>
                  <CircleOff />
                </div>
                <div>Bạn Không có Lời Mời Nào</div>
              </div>
            )}
          <div>
            <h1>Chờ Yêu Cầu</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactRequest.map((value: ProfileProps) => (
              <ChatItem
                key={value.id}
                type="addFriend"
                nameProfile={value.name}
                imageUrl={value.imageUrl}
                email={value.email}
                id={value.id}
                status={value.status}
                friendRequestId={value.friendRequestId}
              />
            ))}
          
          </div>
          {contactRequest.length <= 0 && (
              <div className="flex flex-col justify-center items-center w-full h-72 gap-2">
                <div>
                  <CircleOff />
                </div>
                <div>Bạn Không có Lời Mời Nào</div>
              </div>
            )}
        </div>
      ) : (
        <div className="h-full overflow-auto flex flex-col pl-5 bg-gray-50 justify-center items-center">
          <div className="flex flex-col flex-1 justify-center items-center">
            <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Loading Contact...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactDetail;
