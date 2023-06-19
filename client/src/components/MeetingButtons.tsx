import React from "react";

interface IControlProps {
  img: string;
  children?: React.ReactNode;
}

const Controls = () => {
  return (
    <div className=" flex gap-[30px] items-center absolute bottom-4">
      <div className=" flex gap-6">
        <ControlBox img={"/controls/voice.svg"} />
        <ControlBox img={"/controls/Video.svg"} />
        <ControlBox img={"/controls/User.svg"} />
        <ControlBox img={"/controls/Chat.svg"} />

        <button className=" bg-[#F95A39] p-4 rounded-full">
          <img src="/controls/Call.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Controls;

const ControlBox = (control: IControlProps) => {
  return (
    <button className=" bg-[#303030] p-4 rounded-full">
      <img src={control.img} alt="" className=" w-9 " />
    </button>
  );
};
