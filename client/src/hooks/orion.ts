import usePollingEffect from "@/utils/usePollingEffect";
import { useMemo, useRef, useState } from "react";
import { Chat, Meeting, PolybaseType, Space } from "./polybase-test";
import { HuddleType } from "./huddle01";
import { video } from "@pushprotocol/restapi";
import { useMediaQuery } from "@chakra-ui/react";

export type OrionType = ReturnType<typeof useOrion>;

const useOrion = (x?: {
  space: Space;
  polybase: PolybaseType;
  huddle: HuddleType;
}) => {
  const polls = useRef({
    activityScheduler: false,
  });

  /* LOGIN */
  const login = () => {};

  /* HOME */
  const [_activities, _setActivities] = useState<any[]>([]);

  const _activityPoll = () => {
    // Get activity from Meetings every 5 seconds
    // Get activity from Events every 5 seconds
    // Get activity from Push Protocol

    const getMeetingsActivity = () => {};
    const getEventsActivity = () => {};
    const getPushProtocolActivity = () => {};

    _setActivities((p) => [...p, {}]);
  };

  usePollingEffect(
    async () => polls.current.activityScheduler && _activityPoll(),
    [polls.current.activityScheduler],
    {
      interval: 5000,
      onCleanUp: () => {},
    }
  );

  const getActivities = () => {
    polls.current.activityScheduler = true;
    return _activities;
  };

  const getSpaceDetails = ({
    spaceId,
    getSpaceRecord,
  }: {
    spaceId: string;
    getSpaceRecord: ((spaceId: string) => Promise<Space>) | null;
  }) => {
    const { emoji, name, contractAddress, description } = spaceDetailsDummy;

    return {
      emoji,
      name,
      contractAddress,
      description,
    };
  };

  /* MEETING */
  const [meetingState, setMeetingState] = useState({
    meeting: {} as Meeting,
    chats: [] as Chat[],
    pushNotifications: [] as any[],

    isAdmin: false,
    existingMeeting: false,

    inMeeting: false,
    micMute: false,
    showVideo: true,
    showParticipants: true,
    showChat: false,

    videoRef: null as any,
    Video: null as any,
  });

  const updateMeetingState = (updatedValues: Partial<typeof meetingState>) => {
    setMeetingState((prevState) => ({
      ...prevState,
      ...updatedValues,
    }));
  };

  useMemo(() => {
    const roomId = "zds-hoys-src";
    console.log(x?.huddle.joinLobby.isCallable);

    x?.huddle.initialize(x.huddle.projectId);
    x?.huddle.joinLobby(roomId);
    x?.huddle.setDisplayName("kelvin");
  }, [x?.huddle.joinLobby.isCallable]);

  useMemo(() => {
    console.log(
      x?.huddle.fetchAudioStream.isCallable,
      x?.huddle.fetchVideoStream.isCallable
    );

    x?.huddle.fetchAudioStream();
    x?.huddle.fetchVideoStream();
  }, [
    x?.huddle.fetchVideoStream.isCallable,
    x?.huddle.fetchAudioStream.isCallable,
  ]);

  useMemo(() => {
    console.log(x?.huddle.joinRoom.isCallable);
    console.log(x?.huddle.camStream);

    x?.huddle.joinRoom.isCallable && x?.huddle.joinRoom();
    x?.huddle.produceVideo(x.huddle.camStream);
  }, [x?.huddle.joinRoom.isCallable]);

  const startMeeting = async ({
    name,
    emoji,
    recorded,
    consensus,
  }: {
    name: string;
    emoji: string;
    recorded: boolean;
    consensus: boolean;
  }) => {
    if (!x?.polybase) throw new Error("Polybase not initialized");
    console.log("startMeeting");
    // call endpoint to get meeting room-id
    const roomId = "zds-hoys-src";
    const participants = [""];

    try {
      // const meeting = await x?.polybase.createMeeting({
      //   roomId,
      //   name,
      //   emoji,
      //   spaceId: x.space.id,
      //   recorded,
      //   consensus,
      //   participants,
      // });

      const meeting = {
        roomId,
        name,
        emoji,
        spaceId: x.space.id,
        recorded,
        consensus,
        participants,
      } as Meeting;

      updateMeetingState({
        meeting,
        videoRef: x?.huddle.videoRef,
        Video: x?.huddle.Video,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const joinMeeting = () => {
    // get details from polybase on the meeting
    if (!meetingState.existingMeeting) return;
    x?.huddle.initialize(x?.huddle.projectId);
    x?.huddle.joinLobby(meetingState.meeting.roomId, "");
    x?.huddle.setDisplayName("");
    x?.huddle.fetchVideoStream;
    x?.huddle.fetchAudioStream;
    x?.huddle.joinRoom;
  };

  const endMeeting = () => {
    // end meeting
  };

  const startConsensus = () => {
    // start consensus
  };

  const isSpaceAdmin = () => {
    console.log("isSpaceAdmin");
    // check if user is space admin
  };

  const getRecordings = () => {
    // get recordings
    return [
      {
        id: "1234",
        name: "test",
        url: "QmcmY6EgHNrMunqWfXHsSpuZWU3z4qhZAjHtcFpRRRY9vX",
      },
    ];
  };

  const _pollNewMeeting = () => {
    // poll for new meeting
  };

  const _pollChat = () => {
    // poll for new chat messages
  };

  const _pollConsensus = () => {
    // poll for consensus
  };

  return {
    /* LOGIN */
    login,

    /* HOME */
    getActivities,
    getSpaceDetails,

    /* MEETING */
    meetingState,
    updateMeetingState,

    startMeeting,
    joinMeeting,
    endMeeting,
    startConsensus,

    getRecordings,

    isSpaceAdmin,
  };
};

export default useOrion;

const spaceDetailsDummy = {
  name: "Hack FS 2023",
  contractAddress: "0xB754369b3a7C430d7E94c14f33c097C398a0caa5",
  emoji: "263a-fe0f",
  description: `This project is for Hack FS 2023. we are building a decentralized video conferencing app to help people connect with each other in a secure and private way. `,
};
