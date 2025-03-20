import { useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import "../../styles/rangeInput.css";

interface RangeInputProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (minVal: number, maxVal: number) => void;
}

const RangeInput = ({
  min,
  max,
  minValue,
  maxValue,
  onChange,
}: RangeInputProps) => {
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Update range slider track width
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(maxValue);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, maxValue, getPercent]);

  return (
    <div className={twMerge("mb-10 flex h-[5vh] items-center justify-center")}>
      {/* Left Slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxValue - 1);
          onChange(value, maxValue);
        }}
        className="thumb pointer-events-none absolute z-[3] h-0 w-[260px] outline-0"
        style={{ zIndex: minValue > max - 100 ? 5 : 3 }}
      />

      {/* Right Slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minValue + 1);
          onChange(minValue, value);
        }}
        className="thumb pointer-events-none absolute z-[4] h-0 w-[260px] outline-0"
      />

      <div className="relative w-[260px]">
        {/* Track Background */}
        <div className="absolute z-[1] h-[5px] w-full rounded bg-neutral-300" />

        {/* Selected Range */}
        <div
          ref={range}
          className="absolute z-[2] h-[5px] rounded bg-neutral-900"
        />

        {/* Min Value Display */}
        <div className="absolute left-[3px] mt-5 text-xs text-neutral-300">
          <input
            value={`₦ ${minValue}`}
            disabled
            className="form-input w-[100px] rounded-2xl border-neutral-400 text-center text-[#333] disabled:border-neutral-300 disabled:text-neutral-400"
          />
        </div>

        {/* Max Value Display */}
        <div className="absolute -right-[4px] mt-5 text-xs text-neutral-300">
          <input
            value={`₦ ${maxValue}`}
            disabled
            className="form-input w-[100px] rounded-2xl border-neutral-400 text-center text-[#333] disabled:border-neutral-300 disabled:text-neutral-400"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
