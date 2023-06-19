"use client";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import useOrion from "@/hooks/orion";
import Loader from "react-loaders";

type ExtractStartMeetingType<T> = T extends { startMeeting: infer StartMeeting }
  ? StartMeeting
  : never;

type StartMeeting = ExtractStartMeetingType<ReturnType<typeof useOrion>>;

const StartMeeting = ({
  startMeeting,
  switchToTab,
}: {
  startMeeting?: StartMeeting;
  switchToTab?: (x: number) => void;
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [meetingState, setMeetingState] = useState({
    name: "",
    consensus: false,
    recording: true,
  });

  const updateMeetingState = (updatedValues: Partial<typeof meetingState>) => {
    setMeetingState((prevState) => ({
      ...prevState,
      ...updatedValues,
    }));
  };

  const handleStart = async () => {
    setLoading(true);
    if (switchToTab && startMeeting) {
      // TODO: Check errors before switching tabs
      await startMeeting({
        name: meetingState.name,
        emoji: selectedEmoji,
        recorded: meetingState.recording,
        consensus: meetingState.consensus,
      });

      switchToTab(1);
      setLoading(false);
    }
  };

  return (
    <div className=" w-fit p-6 bg-slate rounded-[20px] flex flex-col gap-4 items-start">
      <p className=" text-[#fff] font-medium text-4xl pl-1">Start a meeting</p>
      <div className=" flex flex-col gap-4">
        <div className="flex items-center  gap-8">
          <div className="bg-slate-input flex p-2 gap-2.5 items-center rounded-[10px] h-fit">
            <EmojiPicker setSelectedEmoji={setSelectedEmoji} />
            <input
              type="text"
              className=" w-[450px] bg-transparent outline-none placeholder:text-text-slatePlaceholder text-lg text-white"
              placeholder="Enter a title..."
              value={meetingState.name}
              onChange={(e) => {
                const name = e.target.value;
                updateMeetingState({ name });
              }}
            />
          </div>

          <button
            onClick={handleStart}
            className="bg-[#4F81FF] rounded-[10px] w-[232px]  py-4 text-lg text-white font-medium relative"
          >
            <span
              style={
                loading
                  ? { visibility: "hidden" }
                  : { alignItems: "center", visibility: "visible" }
              }
            >
              Start
            </span>
            <div
              style={
                loading
                  ? { alignItems: "center", visibility: "visible" }
                  : { visibility: "hidden" }
              }
              className="flex gap-2 items-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2"
            >
              <Loader
                {...{
                  style: {
                    transform: "scale(0.9)",
                    display: "flex",
                    "alignItems": "center",
                    "justifyContent": "center",
                    height: "40px",
                  },
                }}
                active
                type="line-scale-party"
              />
            </div>
          </button>
        </div>

        <div className="flex gap-4 pl-1">
          <div className=" flex gap-2 items-center">
            <Checkbox.Root
              className="shadow-blackA7 flex w-5 h-5 appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
              id="c1"
              checked={meetingState.consensus}
              onCheckedChange={(e) => {
                const consensus = e as boolean;
                updateMeetingState({ consensus });
              }}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className="leading-none text-lg text-white font-light"
              htmlFor="c1"
            >
              Consensus Meeting
            </label>
          </div>

          <div className=" flex gap-2 items-center">
            <Checkbox.Root
              className="shadow-blackA7 flex w-5 h-5 appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
              defaultChecked
              id="c2"
              checked={meetingState.recording}
              onCheckedChange={(e) => {
                const recording = e as boolean;
                updateMeetingState({ recording });
              }}
            >
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              className="leading-none text-lg text-white font-light"
              htmlFor="c2"
            >
              Record Meeting
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMeeting;
