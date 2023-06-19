"use client";
import ActivityBar from "@/components/ActivityBar";
import TopNav from "@/components/Header";
import useOrion from "@/hooks/orion";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import Link from "next/link";

const Space = () => {
  const { getActivities, getSpaceDetails } = useOrion();

  const activities = getActivities();
  const data = getSpaceDetails({ spaceId: "0x123", getSpaceRecord: null });

  return (
    <>
      <TopNav />

      <div className=" w-full flex justify-between items-start h-full">
        <div className=" w-[65%] flex flex-col gap-16 h-full">
          <div className=" bg-gradient-to-r from-[#4F81FF] to-[#AEC5FF]  p-[30px] w-full flex items-center gap-[35px] rounded-[20px]">
            {data.emoji ? (
              <Emoji
                unified={data.emoji}
                emojiStyle={EmojiStyle.NATIVE}
                size={96}
              />
            ) : null}
            <div className=" flex flex-col gap-3 ">
              <p className=" text-4xl text-white">{data.name}</p>
              <Link
                href={`https://goerli.etherscan.io/address/${data.contractAddress}`}
                target="_blank"
                className="flex gap-2 cursor-pointer"
              >
                <p className="text-white font-medium underline font-address">
                  {data.contractAddress}
                </p>
                <img src="/look-up.svg" alt="" />
              </Link>
            </div>
          </div>

          <div className=" flex flex-col gap-4 ">
            <p className="text-4xl font-medium">Read Me</p>
            <p className="max-w-prose leading-7 font-medium font-body text-xl/10">
              {data.description}
            </p>
          </div>
        </div>
        <ActivityBar />
      </div>
    </>
  );
};

export default Space;
