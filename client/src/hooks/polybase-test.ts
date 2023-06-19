import generateQuickGuid from "@/utils/generateQuickGuid";
import stringToHexAddress from "@/utils/stringToHexAddress";
import { Auth } from "@polybase/auth";
import { Polybase } from "@polybase/client";
import { useEffect, useMemo, useState } from "react";

// TODO: add consensus to space
// TODO: add active to meeting

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  spacesId: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Space {
  id: string;
  name: string;
  emoji: string;
  description: string;
  contractAddress: string;
  adminAddress: string;
  pushChannelAddress: string;
  participants: string[];
  meetingsId: string[];
  recordingsId: string[];
  assetsId: string[];
  guidesId: string[];
  eventsId: string[];
  updatedAt: number;
  createdAt: number;
}

export interface Meeting {
  id: string;
  roomId: string;
  name: string;
  emoji: string;
  spaceId: string;
  recorded: boolean;
  consensus: boolean;
  participants: string[];
  chatsId: string[];
  updatedAt: number;
  createdAt: number;
}

interface BaseItem {
  id: string;
  name: string;
  type: string;
  url: string;
  spaceId: string;
  updatedAt: number;
  createdAt: number;
}

export interface Recording extends BaseItem {
  meetingId: string;
}

export interface Asset extends BaseItem {}

export interface Chat {
  id: string;
  message: string;
  userId: string;
  spaceId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Guide {
  id: string;
  name: string;
  content: string;
  spaceId: string;
  updatedAt: number;
  createdAt: number;
}

export interface Event {
  id: string;
  date: string;
  time: string;
  topic: string;
  description: string;
  spaceId: string;
  updatedAt: number;
  createdAt: number;
}

const db = new Polybase({
  defaultNamespace: "", // TODO: add namespace
});

export type PolybaseType = ReturnType<typeof usePolybase>;

const userReference = db.collection("User");
const spaceReference = db.collection("Space");
const meetingReference = db.collection("Meeting");
const recordingReference = db.collection("Recording");
const assetReference = db.collection("Asset");
const chatReference = db.collection("Chat");
const guideReference = db.collection("Guide");
const eventReference = db.collection("Event");

const usePolybase = ({
  userId,
  setUserId,
}: {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}) => {
  const [loggedIn, setLogin] = useState(false);

  const [auth, setAuth] = useState<any>();

  useEffect(() => {
    setAuth(new Auth());
  }, []);

  db.signer(async (data) => {
    console.log(data);
    return {
      h: "eth-personal-sign",
      sig: await auth.ethPersonalSign(data),
    };
  });

  /* USER */

  useMemo(() => {
    auth?.onAuthUpdate((authState: { userId: any }) => {
      if (authState) {
        setLogin(true);
        setUserId(authState.userId);
      } else {
        setLogin(false);
        setUserId(null);
      }
    });
  }, [auth]);

  const authenticate = async () => {
    if (!auth) return;
    console.log(auth);
    const res = await auth.signIn({ force: true });

    if (!res?.userId) {
      auth.signOut();
    } else {
      await userReference.create([
        res?.userId, // id
        "", // name
        res?.email || "", // email
        "", // avatarUrl
        Date.now(), // createdAt
      ]);
      setUserId(res?.userId);
    }
  };

  const getUserRecord = async (userId: string) => {
    return (await userReference.record(userId).get()).data as User;
  };

  const updateUser = async (userId: string, user: Partial<User>) => {
    await userReference.record(userId).call("updateUserInfo", [
      user.name || "", // name
      user.email || "", // email
      user.avatarUrl || "", // avatarUrl
      Date.now(), // updatedAt
    ]);
  };

  const addSpaceToUser = async (userId: string, spaceId: string) => {
    await userReference.record(userId).call("joinSpace", [spaceId, Date.now()]);
  };

  const removeSpaceFromUser = async (userId: string, spaceId: string) => {
    await userReference
      .record(userId)
      .call("leaveSpace", [spaceId, Date.now()]);
  };

  /* SPACE */

  const createSpace = async ({
    name,
    emoji,
    description,
    adminAddress,
    participants,
  }: Space) => {
    if (!userId) return;
    const randomId = stringToHexAddress(generateQuickGuid() + "-" + Date.now());
    await spaceReference
      .create([
        randomId, // id
        name, // name
        emoji, // emoji
        description, // description
        adminAddress, // adminAddress
        participants, // participants
        Date.now(), // createdAt
      ])
      .then(() => {
        userReference.record(userId).call("joinSpace", [randomId, Date.now()]);
      });
  };

  const getSpaceRecord = async (spaceId: string) => {
    return (await spaceReference.record(spaceId).get()).data as Space;
  };

  const updateSpace = async (spaceId: string, space: Partial<Space>) => {
    await spaceReference.record(spaceId).call("updateSpaceInfo", [
      space.name || "", // name
      space.emoji || "", // emoji
      space.description || "", // description
      space.participants || [], // participants
      Date.now(), // updatedAt
    ]);
  };

  const updateSpaceContractAddress = async (
    spaceId: string,
    contractAddress: string
  ) => {
    await spaceReference
      .record(spaceId)
      .call("updateContractAddress", [contractAddress, Date.now()]);
  };

  const updateSpacePushChannelAddress = async (
    spaceId: string,
    pushChannelAddress: string
  ) => {
    await spaceReference
      .record(spaceId)
      .call("updatePushChannelAddress", [pushChannelAddress, Date.now()]);
  };

  /* MEETING */

  const createMeeting = async ({
    roomId,
    name,
    emoji,
    spaceId,
    recorded,
    consensus,
    participants,
  }: {
    roomId: string;
    name: string;
    emoji: string;
    spaceId: string;
    recorded: boolean;
    consensus: boolean;
    participants: string[];
  }) => {
    const randomId = generateQuickGuid() + "-" + Date.now();
    const x = await meetingReference.create([
      randomId,
      roomId,
      name,
      emoji,
      spaceId,
      recorded,
      consensus,
      participants,
      Date.now(), // createdAt
    ]);
    spaceReference.record(spaceId).call("addMeetingId", [randomId, Date.now()]);
    return x.data as Meeting;
  };

  const getMeetingRecord = async (meetingId: string) => {
    return (await meetingReference.record(meetingId).get()).data as Meeting;
  };

  // TODO: update meeting

  const addChatToMeeting = async (
    meetingId: string,
    chatId: string,
    updatedAt: number
  ) => {
    await meetingReference
      .record(meetingId)
      .call("setChatId", [chatId, updatedAt]);
  };

  const addParticipantToMeeting = async (
    meetingId: string,
    participant: string,
    updatedAt: number
  ) => {
    await meetingReference
      .record(meetingId)
      .call("setParticipant", [participant, updatedAt]);
  };

  /* RECORDING */

  const createRecording = async ({
    name,
    type,
    url,
    spaceId,
    meetingId,
    updatedAt,
    createdAt,
  }: Recording) => {
    const randomId = generateQuickGuid() + "-" + Date.now();
    await recordingReference
      .create([
        randomId, // id
        name, // name
        type, // type
        url, // url
        spaceId, // spaceId
        meetingId, // meetingId
        updatedAt, // updatedAt
        createdAt, // createdAt
      ])
      .then(() => {
        spaceReference
          .record(spaceId)
          .call("addRecordingId", [randomId, Date.now()]);
      });
  };

  const getRecordingRecord = async (recordingId: string) => {
    return (await recordingReference.record(recordingId).get())
      .data as Recording;
  };

  /* ASSETS */

  const createAsset = async ({ name, type, url, spaceId }: Asset) => {
    const randomId = generateQuickGuid() + "-" + Date.now();
    await assetReference
      .create([
        randomId, // id
        name, // name
        type, // type
        url, // url
        spaceId, // spaceId
        Date.now(), // createdAt
      ])
      .then(() => {
        spaceReference
          .record(spaceId)
          .call("addAssetId", [randomId, Date.now()]);
      });
  };

  /* CHAT */

  const createChat = async ({
    meetingId,
    message,
    userId,
    spaceId,
  }: { meetingId: string } & Chat) => {
    const randomId = generateQuickGuid() + "-" + Date.now();
    await chatReference
      .create([
        randomId, // id
        message, // message
        userId, // userId
        spaceId, // spaceId
        Date.now(), // createdAt
      ])
      .then(() => {
        meetingReference
          .record(meetingId)
          .call("setChatId", [randomId, Date.now()]);
      });
  };

  const getChatRecord = async (chatId: string) => {
    return (await chatReference.record(chatId).get()).data as Chat;
  };

  /* GUIDE */

  const createGuide = async ({ name, content, spaceId }: Guide) => {
    const randomId = generateQuickGuid() + "-" + Date.now();
    await guideReference
      .create([
        randomId, // id
        name, // name
        content, // content
        spaceId, // spaceId
        Date.now(), // createdAt
      ])
      .then(() => {
        spaceReference
          .record(spaceId)
          .call("addGuideId", [randomId, Date.now()]);
      });
  };

  const updateGuide = async (guideId: string, guide: Partial<Guide>) => {
    await guideReference.record(guideId).call("updateGuideInfo", [
      guide.name || "", // name
      guide.content || "", // content
      Date.now(), // updatedAt
    ]);
  };

  /* EVENT */

  const createEvent = async ({
    date,
    time,
    topic,
    description,
    spaceId,
  }: Event) => {
    const randomId = generateQuickGuid() + "-" + Date.now();
    await eventReference
      .create([
        randomId, // id
        date, // date
        time, // time
        topic, // topic
        description, // description
        spaceId, // spaceId
        Date.now(), // createdAt
      ])
      .then(() => {
        spaceReference
          .record(spaceId)
          .call("addEventId", [randomId, Date.now()]);
      });
  };

  const updateEvent = async (eventId: string, event: Partial<Event>) => {
    await eventReference.record(eventId).call("updateEventInfo", [
      event.date || "", // date
      event.time || "", // time
      event.topic || "", // topic
      event.description || [], // description
      Date.now(), // updatedAt
    ]);
  };

  return {
    // user
    authenticate,
    loggedIn,
    getUserRecord,
    updateUser,
    addSpaceToUser,
    removeSpaceFromUser,

    // space
    createSpace,
    getSpaceRecord,
    updateSpace,
    updateSpaceContractAddress,
    updateSpacePushChannelAddress,

    // meeting
    createMeeting,
    getMeetingRecord,
    addChatToMeeting,
    addParticipantToMeeting,

    // recording
    createRecording,
    getRecordingRecord,

    // asset
    createAsset,

    // chat
    createChat,
    getChatRecord,

    // guide
    createGuide,
    updateGuide,

    // event
    createEvent,
    updateEvent,
  };
};

export default usePolybase;
