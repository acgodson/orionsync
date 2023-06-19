const ChatRoom = () => {
  return (
    <div className=" max-w-[400px] w-full rounded-[20px] bg-white flex flex-col justify-between items-center overflow-hidden">
      <div className=" flex flex-col w-full">
        <p className=" font-medium text-4xl text-[#303030] pt-[30px] pl-[30px]">Chat</p>
        <Chat />
      </div>

      <div className=" w-full p-[30px]">
        <input
          type="text"
          className=" bg-[#E9E9E9] p-[20px] w-full outline-none rounded-full"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default ChatRoom;

const Chat = () => {
  const chatMessage = [
    {
      name: "Tomi",
      message:
        "Aspernatur dignissimos saepe accusamus consectetur voluptatum officia obcaecati ex commodi ullam error.",
    },
    {
      name: "Nelson",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dignissimos saepe accusamus consectetur voluptatum officia obcaecati ex commodi ullam error.",
    },
    {
      name: "Nelson",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dignissimos saepe accusamus consectetur voluptatum officia obcaecati ex commodi ullam error.",
    },
  ];
  return (
    <div className=" flex flex-col gap-[30px] p-[30px] h-[calc(100vh-370px)] overflow-y-scroll">
      {chatMessage.map((chat, i) => (
        <div className="  flex gap-4" key={i}>
          <div className="opacity-0 min-w-[60px] h-[60px] bg-violet-500 rounded-full" />
          <div className="opacity-0 flex flex-col gap-2.5 w-full">
            <p className=" text-[#ACACAC] font-medium">{chat.name}</p>
            <div className="  p-4 w-full bg-[#E9E9E9] rounded-[20px]">
              {chat.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
