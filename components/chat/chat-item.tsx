"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import axios from "axios";
import qs from "query-string";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { useState } from "react";
interface ChatItemProps {
  id: string;
  type: "addFriend" | "listFriend";
  nameProfile: string | "none";
  email: string | "none";
  imageUrl:
    | string
    | "https://utfs.io/f/30bf0d54-3fa7-42ae-9f7f-e28b5acf0b96-1x9cqv.jpeg";
  status?: string;
}
export const ChatItem = ({
  id,
  type,
  nameProfile,
  email,
  imageUrl,
  status,
}: ChatItemProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const addFriend = async () => {
    const url = qs.stringifyUrl({
      url: "/api/direct-message",
      query: {
        profileIdRequest: id,
      },
    });

    await axios.get(url);
    setCurrentStatus("pending");
  };

  const cancelFriend = async () => {};

  const acceptFriend = async () => {};

  return (
    <div
      className="flex flex-row w-full 
        h-[70px] cursor-pointer
        hover:bg-gray-100
        transition-all
        group
    "
    >
      <div className="p-2 ">
        <div
          className="relative 
            rounded-full 
            overflow-hidden 
            border 
            bg-secondary
            h-12 w-12 border-1 border-black"
        >
          <Image src={imageUrl} alt="" fill className="object-cover" />
        </div>
      </div>
      <div className="flex-1 flex flex-col mt-2">
        <div>
          <p
            className="text-sm text-gray-600
            dark:text-white 
            dark:group-hover:text-black
          "
          >
            {nameProfile}
          </p>
        </div>
        <div>
          {type === "addFriend" ? (
            <p className="text-[10px] text-gray-400">{email}</p>
          ) : (
            <p className="text-sm text-gray-400">Message</p>
          )}
        </div>
      </div>
      <div className="p-2 text-xs dark:group-hover:text-black">
        {type == "addFriend" ? (
          <>
            {currentStatus === "pending" && (
              <div className="flex flex-row gap-1">
                <Button
                  className=" text-gray-500
          border 
            text-[10px]
          bg-gray-200
          h-8 w-12 border-1 border-black
          hover:bg-blue-200
            "
                  disabled
                >
                  Chờ
                </Button>
                <Button
                  className=" text-gray-500
                border 
                  text-[10px]
                bg-red-200
                h-8 w-12 border-1 border-black
                hover:bg-red-300
          "
                  onClick={cancelFriend}
                >
                  Bỏ cuộc
                </Button>
              </div>
            )}

            {currentStatus === "accepted" && (
              <Button
                className=" text-blue-500 
            border 
            bg-green-400
            h-22 w-22 border-1 border-black
            hover:bg-green-600
              "
                disabled
              >
                Bạn bè
              </Button>
            )}

            {currentStatus === "" && (
              <Button
                className=" text-blue-500 
            border 
            bg-gray-200
            h-22 w-22 border-1 border-black
            hover:bg-blue-200
              "
                onClick={addFriend}
              >
                Kết bạn
              </Button>
            )}

            {currentStatus === "receivedRequest" && (
              <div className="flex flex-row gap-1">
                <Button
                  className=" text-gray-500
            border 
              text-[10px]
            bg-gray-200
            h-8 w-16 border-1 border-black
            hover:bg-blue-200
              "
                  onClick={acceptFriend}
                >
                  Chấp Nhận
                </Button>
                <Button
                  className=" text-gray-500
                  border 
                    text-[10px]
                  bg-red-200
                  h-8 w-10 border-1 border-black
                  hover:bg-red-300
            "
                  onClick={cancelFriend}
                >
                  Cút
                </Button>
              </div>
            )}
          </>
        ) : (
          <p>1 hour</p>
        )}
      </div>
    </div>
  );
};
