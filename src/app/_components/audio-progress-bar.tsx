import { Slider } from "~/components/ui/slider";
import { Progress } from "~/components/ui/progress";

interface AudioProgressBarProps extends React.ComponentProps<typeof Slider> {
  duration: number;
  currentProgress: number;
}

export default function AudioProgressBar(props: AudioProgressBarProps) {
  const { duration, currentProgress, ...rest } = props;

  return (
    <div className="group flex flex-grow">
      <Slider
        className="hidden group-hover:flex"
        min={0}
        max={duration}
        value={[currentProgress]}
        {...rest}
      />
      <Progress
        className="text-background m-auto flex h-1 group-hover:hidden"
        max={duration}
        value={(100 / duration) * currentProgress}
      />
    </div>
  );
}
