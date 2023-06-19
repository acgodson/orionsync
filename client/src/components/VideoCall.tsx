"use client";
import useOrion from "@/hooks/orion";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import Loader from "react-loaders";

type ExtractMeetingState<T> = T extends { meetingState: infer MeetingState }
  ? MeetingState
  : never;

type MeetingState = ExtractMeetingState<ReturnType<typeof useOrion>>;

const VideoCall = ({
  meetingState,
  style,
}: {
  meetingState: MeetingState;
  style?: React.CSSProperties;
}) => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log(meetingState.videoRef);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setMaxHeight(containerHeight);
    }
  }, [containerRef.current]);

  const calculateWidth = (height: number): number => {
    return (height * 16) / 9;
  };

  let gridCols = "";
  let streams = 1;

  switch (streams) {
    case 1:
      gridCols = "grid-cols-1";
      break;
    case 2:
      gridCols = "grid-cols-1";
      break;
    case 3:
      gridCols = "grid-cols-2";
      break;
    default:
      gridCols = "grid-cols-2";
      break;
  }
  console.log(meetingState);


  return (
    <div style={style} className="flex flex-1 gap-8 flex-col">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Emoji unified={meetingState.meeting.emoji} emojiStyle={EmojiStyle.NATIVE} size={36} />
          <p className="text-2xl font-medium">{meetingState.meeting.name}</p>
        </div>
        <div className="flex gap-4 items-center">
          <Loader
            {...{
              style: {
                transform: "scale(0.3)",
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                height: "40px",
              },
            }}
            active
            type="ball-scale-multiple"
          />
          recording
        </div>
      </div>

      <div
        className={`grid ${gridCols} gap-4 justify-center items-center flex-1 place-items-center`}
        ref={containerRef}
      >
        {Array.from(Array(streams)).map((_, index) => {
          const width = calculateWidth(maxHeight);

          return (
            <div
              key={index}
              style={{ width: streams === 2 ? width / 2 - 16 : "100%" }}
              className={`shadow-blackA7 overflow-hidden rounded-md shadow-[0_2px_10px]`}
            >
              <AspectRatio.Root ratio={16 / 9}>
                {/* <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                  alt="Landscape photograph by Tobias Tullius"
                /> */}
                <video
                  className="h-full w-full"
                  ref={meetingState.videoRef}
                  autoPlay
                  muted
                ></video>
                {/* <div className="grid grid-cols-4">
                  {Object.values(peers)
                    .filter((peer) => peer.cam)
                    .map((peer) => (
                      <>
                        role: {peer.role}
                        <Video
                          key={peer.peerId}
                          peerId={peer.peerId}
                          track={peer.cam}
                          debug
                        />
                      </>
                    ))}
                </div> */}
              </AspectRatio.Root>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCall;
