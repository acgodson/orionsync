import React from "react";

const ActivityBar = () => {
  return (
    <div className=" min-w-[354px] p-[30px] bg-white flex flex-col gap-5 rounded-[20px]">
      <p className=" text-4xl font-medium">Activity</p>
      <div className=" flex flex-col p-4 gap-4 bg-[#303030] rounded-[20px]">
        <div className=" flex items-center gap-[20px]">
          <img src="/videoWhite.svg" alt="" />
          <div className=" flex items-start">
            <div className={` w-10 h-10 rounded-full bg-[#CECECE]`} />
            <div
              className={` w-10 h-10 rounded-full bg-[#C0C0C0] ml-[-16px]`}
            />
            <div
              className={` w-10 h-10 rounded-full bg-[#A1A1A1]  ml-[-16px]`}
            />
          </div>
        </div>
        <button className=" w-full bg-[#4F81FF] py-4 rounded-[10px] font-medium text-xl text-white">
          join meeting
        </button>
      </div>
      <div className=" flex flex-col p-4 gap-4 bg-[#303030] rounded-[20px]">
        <div className=" flex items-center gap-[20px]  h-10 ">
          <img src="/calendarWhite.svg" alt="" />
        </div>
        <div className=" p-4 bg-white rounded-[10px] min-h-[200px] flex justify-center items-center">
          Event
        </div>
        <button className=" w-full bg-[#4F81FF] py-4 rounded-[10px] font-medium text-xl text-white">
          Close Event
        </button>
      </div>
    </div>
  );
};

export default ActivityBar;
