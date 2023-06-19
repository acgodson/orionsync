import React from "react";

const Consensus = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <div style={style} className=" w-full flex flex-col gap-16">
      <div className=" flex flex-col gap-8 w-[820px] items-start">
        <p className=" text-[#04216A] text-4xl font-medium">Create consensus</p>
        {["@kelvinpraises", "@tinybird"].map((item, i) => (
          <ConsensusMember name={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Consensus;

const ConsensusMember = ({ name }: { name: string }) => (
  <div className=" bg-[#181E2E] p-8 gap-4 flex flex-col w-full rounded-[20px]">
    <p className=" text-xl font-medium text-white">{name}</p>
    <div className=" flex gap-8">
      <input
        type="text"
        className=" bg-[#2A3552] outline-none pl-4 text-white w-full rounded-[10px]"
      />
      <button className=" bg-[#2A3552] outline-none p-4 pr-6  text-[#5D74B2] rounded-[10px]">
        Share
      </button>
    </div>
  </div>
);
