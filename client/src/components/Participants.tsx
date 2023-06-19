import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useEffect, useRef, useState } from "react";

const Participants = () => {
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      containerHeight && setMaxHeight(containerHeight);
    }
  }, [containerRef.current]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: maxHeight ? maxHeight : "initial",
        height: maxHeight ? maxHeight : "initial",
      }}
      className="min-w-[224px] p-4 bg-[#181E2E] rounded-[20px] h-full overflow-scroll"
    >
      {maxHeight && !loading ? (
        <div className="flex flex-col gap-4">
          <div className={`w-full overflow-hidden rounded-[10px]`}>
            <AspectRatio.Root ratio={16 / 9}>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio.Root>
          </div>
          <div className={`w-full overflow-hidden rounded-[10px]`}>
            <AspectRatio.Root ratio={16 / 9}>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio.Root>
          </div>
          <div className={`w-full overflow-hidden rounded-[10px]`}>
            <AspectRatio.Root ratio={16 / 9}>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio.Root>
          </div>
          <div className={`w-full overflow-hidden rounded-[10px]`}>
            <AspectRatio.Root ratio={16 / 9}>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio.Root>
          </div>
          <div className={`w-full overflow-hidden rounded-[10px]`}>
            <AspectRatio.Root ratio={16 / 9}>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio.Root>
          </div>
          <div className={`w-full overflow-hidden rounded-[10px]`}>
            <AspectRatio.Root ratio={16 / 9}>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio.Root>
          </div>
        </div>
      ) : (
        <>loading</>
      )}
    </div>
  );
};

export default Participants;
