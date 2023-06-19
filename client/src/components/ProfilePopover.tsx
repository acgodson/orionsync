"use client";
import * as Avatar from "@radix-ui/react-avatar";

export default function ProfilePopover({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <Avatar.Root className="bg-blackA3 inline-flex -ml-4 h-[50px] w-[50px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={alt}
      />
      <Avatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        {alt}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
