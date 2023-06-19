import Link from "next/link";
import TabSwitcher from "./TabSwitcher";

const SpaceAuth = () => {
  return (
    <TabSwitcher>
      <TabSwitcher.Tab>
        <Home />
      </TabSwitcher.Tab>
      <TabSwitcher.Tab>
        <Create />
      </TabSwitcher.Tab>
      <TabSwitcher.Tab>
        <Join />
      </TabSwitcher.Tab>
      <TabSwitcher.Tab>
        <SpaceId />
      </TabSwitcher.Tab>
    </TabSwitcher>
  );
};

const Controls = ({ switchToTab }: PanelProps) => {
  return (
    <div className=" bg-[rgba(255,255,255,0.3)] flex flex-col gap-4 p-4 w-[300px] rounded-[20px]">
      <div className=" flex gap-2 items-center">
        <img src="/Discovery.svg" alt="" />
        <p className="text-[#04216A]">Let’s get started!</p>
      </div>
      <button
        onClick={() => switchToTab && switchToTab(1)}
        className=" bg-[#4F81FF] py-4 w-full rounded-[10px] text-white text-lg font-medium"
      >
        Create Space
      </button>
      <button
        onClick={() => switchToTab && switchToTab(2)}
        className=" bg-[#4F81FF] py-4 w-full rounded-[10px] text-white text-lg font-medium"
      >
        Join a Space
      </button>
      <p className=" text-[#04216A]">Scroll down to see your spaces.</p>
    </div>
  );
};

type PanelProps = {
  style?: React.CSSProperties;
  switchToTab?: (x: number) => void;
};

const Home = ({ style, switchToTab }: PanelProps) => {
  return (
    <div style={style} className="flex gap-8 items-center">
      <Controls {...{ switchToTab }} />

      <div className=" w-[700px] h-[700px] bg-[#181E2E] rounded-[20px] p-8 flex flex-col items-center text-white">
        <div className=" flex gap-8 items-center pt-[148px]">
          <img src="/logoHome.svg" className=" w-[50px]" alt="" />
          <p className=" text-[64px] text-white font-extralight">Orion Sync </p>
        </div>
        <p className=" w-[380px] text-white text-[24px] text-center">
          Connect, collaborate and fairly distribute workspace prizes with ease
        </p>
      </div>
    </div>
  );
};

const Create = ({ style, switchToTab }: PanelProps) => {
  return (
    <div style={style} className="flex gap-8 items-center">
      <Controls {...{ switchToTab }} />

      <div className=" w-[700px] h-[700px] bg-[#181E2E] rounded-[20px] p-8 flex flex-col items-center text-white">
        <div className=" w-full flex flex-col gap-8 ">
          <p className=" text-[32px] text-white">Create Space</p>
          <div className=" flex flex-col gap-2">
            <p className=" text-white font-medium text-xl">Name</p>
            <div className=" flex bg-[#2A3552] rounded-[10px] p-4 gap-4">
              <img src="/emoji.svg" alt="" />
              <input
                type="text"
                className=" w-full bg-transparent outline-none text-white"
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <p className=" text-white font-medium text-xl">Description</p>
            <div className=" flex bg-[#2A3552] rounded-[10px] p-4 gap-4">
              <textarea className=" w-full bg-transparent outline-none text-white resize-none h-[90px]" />
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <p className=" text-white font-medium text-xl">
              Participant Address
            </p>
            <div className=" flex bg-[#2A3552] rounded-[10px] p-4 gap-4">
              <textarea className=" w-full bg-transparent outline-none text-white resize-none h-[80px]" />
            </div>
          </div>
          <button className=" w-full bg-[#4F81FF] py-4 rounded-[10px] text-white font-medium text-lg">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

const Join = ({ style, switchToTab }: PanelProps) => {
  return (
    <div style={style} className="flex gap-8 items-center">
      <Controls {...{ switchToTab }} />

      <div className=" w-[700px] h-[700px] bg-[#181E2E] rounded-[20px] p-8 flex flex-col items-center text-white">
        <div className=" w-full  font-medium flex flex-col gap-8">
          <p className=" text-[32px]">Join a space</p>
          <div className=" flex flex-col gap-2">
            <p className=" text-white font-medium text-xl">Space Id</p>
            <div className=" flex bg-[#2A3552] rounded-[10px] p-4 gap-4">
              <input
                type="text"
                className=" w-full bg-transparent outline-none text-white text-base"
              />
            </div>
          </div>
          <button className=" w-full bg-[#4F81FF] rounded-[10px] py-4 font-medium text-lg">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

const SpaceId = ({ style, switchToTab }: PanelProps) => {
  return (
    <div style={style} className="flex gap-8 items-center">
      <Controls {...{ switchToTab }} />

      <div className=" w-[700px] h-[700px] bg-[#181E2E] rounded-[20px] p-8 flex flex-col items-center text-white">
        <div className=" pt-[148px] flex flex-col items-center gap-[24px] w-full">
          <div className=" flex flex-col items-center gap-4">
            <p className="  text-4xl">Here is your space id</p>
            <p className=" text-lg">
              You can invite friends to join using this
            </p>
          </div>
          <div className=" flex bg-[#2A3552] rounded-[10px] p-4 gap-4 w-full">
            <input
              type="text"
              className=" w-full bg-transparent outline-none text-white"
            />
            <img src="/Copy.svg" alt="" className=" cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceAuth;
