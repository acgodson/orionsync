"use client";

import ChatRoom from "@/components/ChatRoom";
import Consensus from "@/components/Consensus";
import TopNav from "@/components/Header";
import MeetingButtons from "@/components/MeetingButtons";
import Participants from "@/components/Participants";
import Recording from "@/components/Recording";
import StartMeeting from "@/components/StartMeeting";
import TabSwitcher from "@/components/TabSwitcher";
import VideoCall from "@/components/VideoCall";
import useHuddle01 from "@/hooks/huddle01";
import useOrion from "@/hooks/orion";
import usePolybase, { Space } from "@/hooks/polybase-test";

const Meeting = () => {
  const user = { userId: "", setUserId: () => {} };
  const space = {} as Space;

  const polybase = usePolybase(user);
  const huddle = useHuddle01();
  const {
    meetingState,
    isSpaceAdmin,
    startMeeting,
    joinMeeting,
    endMeeting,
    startConsensus,
    getRecordings,
  } = useOrion({ space, polybase, huddle });

  isSpaceAdmin();

  const meetingActions = {
    meetingState,
    startMeeting,
    joinMeeting,
    getRecordings,
  };

  return (
    <>
      <TopNav>
        <p className="text-4xl font-medium">Meeting</p>
      </TopNav>

      <TabSwitcher>
        <TabSwitcher.Tab>
          <HomePanel {...{ meetingActions }} />
        </TabSwitcher.Tab>
        <TabSwitcher.Tab>
          <MainPanel {...{ meetingActions }} />
        </TabSwitcher.Tab>
      </TabSwitcher>
    </>
  );
};

export default Meeting;

type PanelProps = {
  style?: React.CSSProperties;
  switchToTab?: (x: number) => void;
};

// NOTE: The style prop and switchToTab is passed in by TabSwitcher

const HomePanel = ({
  style,
  switchToTab,
  meetingActions,
}: PanelProps & {
  meetingActions: {
    startMeeting: any;
    joinMeeting: any;
    meetingState: any;
    getRecordings: any;
  };
}) => {
  return (
    <div style={style} className=" flex flex-col gap-8 items-start">
      <StartMeeting
        startMeeting={meetingActions.startMeeting}
        switchToTab={switchToTab}
      />

      <p className=" text-[#303030] font-medium text-4xl">Recordings</p>
      <div className=" grid grid-cols-4 gap-8">
        {meetingActions.getRecordings().map((recording: any) => {
          return (
            <Recording
              key={Math.random()}
              id={recording.id}
              name={recording.name}
              url={recording.url}
            />
          );
        })}
      </div>
    </div>
  );
};

const MainPanel = ({
  style,
  switchToTab,
  meetingActions,
}: PanelProps & {
  meetingActions: {
    startMeeting: any;
    joinMeeting: any;
    meetingState: any;
    getRecordings: any;
  };
}) => {
  return (
    <div
      style={style}
      className=" flex max-h-full justify-center gap-[30px] items-start w-full flex-1"
    >
      <div className=" flex  justify-between p-[30px]  bg-white rounded-[30px] gap-[30px] w-full h-full relative overflow-hidden">
        <TabSwitcher>
          <TabSwitcher.Tab>
            <VideoCallPanel meetingState={meetingActions.meetingState} />
          </TabSwitcher.Tab>

          <TabSwitcher.Tab>
            <ConsensusPanel />
          </TabSwitcher.Tab>
        </TabSwitcher>

        <Participants />
        <MeetingButtons />
      </div>
      <ChatRoom />
    </div>
  );
};

const VideoCallPanel = ({
  style,
  meetingState,
}: PanelProps & {
  meetingState: any;
}) => {
  return <VideoCall meetingState={meetingState} style={style} />;
};

const ConsensusPanel = ({ style }: PanelProps) => {
  return <Consensus style={style} />;
};
