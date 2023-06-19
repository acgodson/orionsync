import generateQuickGuid from "@/utils/generateQuickGuid";
import { Auth } from "@polybase/auth";
import { Polybase } from "@polybase/client";
import { useEffect, useMemo, useState } from "react";

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
  participants: string[];
  meetingsId: string[];
  recordingsId: string[];
  assetsId: string[];
  updatedAt: number;
  createdAt: number;
}

export interface Meeting {
  id: string;
  name: string;
  emoji: string;
  spaceId: string;
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

export interface Recording extends BaseItem {}

export interface Asset extends BaseItem {}

export interface Chat {
  id: string;
  message: string;
  userId: string;
  spaceId: string;
  createdAt: number;
  updatedAt: number;
}

const db = new Polybase({
  defaultNamespace: "", // TODO: add namespace
});

const userReference = db.collection("User");
const spaceReference = db.collection("Space");
const chatReference = db.collection("Chat");

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

  /* SPACE */

  const createSpace = async ({
    name,
    emoji,
    description,
    participants,
  }: {
    name: string;
    emoji: string;
    description: string;
    participants: string[];
  }) => {
    if (!userId) return;
    const randomId = generateQuickGuid() + "-" + Date.now();
    await spaceReference
      .create([
        randomId, // id
        name, // name
        emoji, // emoji
        description, // description
        participants, // participants
        Date.now(), // createdAt
      ])
      .then(() => {
        userReference
          .record(userId)
          .call("setSpacesId", [randomId, Date.now()]);
      });
  };

  const getSpaceRecord = async (spaceId: string) => {
    return (await spaceReference.record(spaceId).get()).data as Space;
  };

  const joinSpace = async (spaceId: string) => {
    if (!userId) return;
    await userReference
      .record(userId)
      .call("setCommunityId", [spaceId, Date.now()]);
  };

  /* CHAT */

  return {
    authenticate,
    loggedIn,
    getUserRecord,

    createSpace,
    getSpaceRecord,
    joinSpace,
  };
};

export default usePolybase;
