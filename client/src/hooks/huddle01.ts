import { useHuddle01 as _useHuddle01, useEventListener } from "@huddle01/react";
import { useDisplayName } from "@huddle01/react/app-utils";
import { Audio, Video } from "@huddle01/react/components";
import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRecording,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";
import { useRef, useState } from "react";

export type HuddleType = ReturnType<typeof useHuddle01>;

const useHuddle01 = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log(videoRef);

  const [roomId, setRoomId] = useState("");
  const [displayNameText, setDisplayNameText] = useState("Guest");
  const projectId = "TxG-OolMwGeCoZPzX660e65wwuU2MP83";
  const [accessToken, setAccessToken] = useState("");

  const { initialize } = _useHuddle01();

  const { state, send } = useMeetingMachine();

  const { setDisplayName, error: displayNameError } = useDisplayName();
  const { joinLobby } = useLobby();
  const { joinRoom, leaveRoom } = useRoom();
  const { peers } = usePeers();

  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();

  const {
    startRecording,
    stopRecording,
    error,
    data: recordingData,
  } = useRecording();

  useEventListener("lobby:cam-on", () => {
    console.log(!!camStream);
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
    console.log("done");
  });
  useEventListener("room:joined", () => {
    console.log("room:joined");
  });
  useEventListener("lobby:joined", () => {
    console.log("lobby:joined");
  });

  return {
    videoRef,

    roomId,
    setRoomId,
    displayNameText,
    setDisplayNameText,
    projectId,
    accessToken,
    setAccessToken,

    initialize,

    state,
    send,

    setDisplayName,
    displayNameError,
    joinLobby,
    joinRoom,
    leaveRoom,
    peers,

    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    micStream,
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    camStream,

    startRecording,
    stopRecording,
    error,
    recordingData,

    Audio,
    Video,
  };
};

export default useHuddle01;
