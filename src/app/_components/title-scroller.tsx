import { useEffect, useRef } from "react";
import { m, useAnimation } from "framer-motion";
import { Skeleton } from "~/components/ui/skeleton";

type TitleScrollerProps = {
  title?: string;
};

export default function TitleScroller({ title }: TitleScrollerProps) {
  const controls = useAnimation();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.stop();
    controls.set({ x: 0 });

    const calculateAndRunAnimation = () => {
      if (titleRef.current) {
        const scrollWidth = titleRef.current.scrollWidth;
        const clientWidth = titleRef.current.clientWidth;
        // Calculate the distance to translate the element
        const distance = clientWidth - scrollWidth;

        // Check if the text overflows and needs scrolling
        if (distance < 0) {
          void controls.start({
            x: [0, distance],
            transition: {
              duration: Math.max(5, Math.abs(distance) / 10),
              ease: "linear",
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 1,
              delay: 1,
            },
          });
        }
      }
    };
    setTimeout(() => calculateAndRunAnimation(), 1000);
    window.addEventListener("resize", calculateAndRunAnimation);

    return () => window.removeEventListener("resize", calculateAndRunAnimation);
  }, [title, controls]);

  if (!title) return <Skeleton />;

  return (
    <div className="overflow-hidden whitespace-nowrap" ref={titleRef}>
      <m.div
        animate={controls}
        className="text-sm font-bold text-accent-foreground"
      >
        {title}
      </m.div>
    </div>
  );
}
