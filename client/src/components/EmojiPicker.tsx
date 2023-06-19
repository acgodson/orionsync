"use client";
import * as Popover from "@radix-ui/react-popover";
import { data } from "autoprefixer";
import _EmojiPicker, {
  Emoji,
  EmojiClickData,
  EmojiStyle,
} from "emoji-picker-react";
import { useState } from "react";

const EmojiPicker = ({
  setSelectedEmoji,
}: {
  setSelectedEmoji: (emoji: string) => void;
}) => {
  const [selectedEmoji, _setSelectedEmoji] = useState<string>("");

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
    _setSelectedEmoji(emojiData.unified);
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {selectedEmoji ? (
          <button
            className="border-[1.5px] border-dashed border-white rounded-[5px] p-[2px] text-2xl font-emoji-color text-text-slatePlaceholder"
            aria-label="Choose emoji"
          >
            <Emoji
              unified={selectedEmoji}
              emojiStyle={EmojiStyle.NATIVE}
              size={24}
            />
          </button>
        ) : (
          <button
            className="border-[1.5px] border-dashed border-white rounded-[5px] p-[2px] text-2xl font-emoji text-text-slatePlaceholder"
            aria-label="Choose emoji"
          >
            🙂
          </button>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <_EmojiPicker
            onEmojiClick={onClick}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.NATIVE}
          />
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default EmojiPicker;
