import leftArrowSvg from "../assets/left.svg";
import rightArrowSvg from "../assets/right.svg";
import { Button } from "./Button";

type Props = {
  current: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
};

export function Pagination({ current, total, onNext, onPrevious }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center gap-3 mt-6">
      <Button
        variant="icon"
        className="w-8 h-8"
        onClick={onPrevious}
        disabled={current === 1}
      >
        <img src={leftArrowSvg} alt="Previous icon" />
      </Button>

      <span className="text-sm text-gray-200 font-semibold">
        {current}/{total}
      </span>

      <Button
        variant="icon"
        className="w-8 h-8"
        onClick={onNext}
        disabled={current === total}
      >
        <img src={rightArrowSvg} alt="Next icon" />
      </Button>
    </div>
  );
}
