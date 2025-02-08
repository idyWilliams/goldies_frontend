import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import "../../styles/rangeInput.css";

interface RangeInputProps {
  min: number;
  max: number;
  onChange: (minVal: number, maxVal: number) => void;
}

const RangeInput = ({ min, max, onChange }: RangeInputProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange(minVal, maxVal);
  }, [minVal, maxVal, onChange]);

  return (
    <div className={twMerge("mb-10 flex h-[5vh] items-center justify-center")}>
      <input
        id="min"
        name="min"
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb pointer-events-none absolute z-[3] h-0 w-[260px] outline-0"
        // style={{ zIndex: minVal > max - 100 && "5" }}
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />
      <input
        id="max"
        name="max"
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb pointer-events-none absolute z-[4] h-0 w-[260px] outline-0"
      />

      <div className="relative w-[260px]">
        <div className="absolute z-[1] h-[5px] w-full rounded bg-neutral-400" />
        <div
          ref={range}
          className="absolute z-[2] h-[5px] rounded bg-neutral-900"
        />
        <div className="absolute left-[3px] mt-5 text-xs text-neutral-300">
          <input
            id="minVal"
            name="minVal"
            value={`€ ${minVal}`}
            disabled
            className="form-input inline-block w-[80px] rounded-2xl border-neutral-400 text-center text-[#333] focus:border-neutral-900 focus:ring-neutral-900 disabled:border-neutral-300 disabled:text-neutral-400"
            // onChange={(e) => setMinVal(parseInt(e.target.value) || 0)}
          />
        </div>
        <div className="absolute -right-[4px] mt-5 text-xs text-neutral-300">
          <input
            id="maxVal"
            name="maxVal"
            value={`€ ${maxVal}`}
            disabled
            className="form-input inline-block w-[80px] rounded-2xl border-neutral-400 text-center text-[#333] focus:border-neutral-900 focus:ring-neutral-900 disabled:border-neutral-300 disabled:text-neutral-400"
            // onChange={(e) => setMaxVal(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

// type RangeInputProps = {
//   min: any;
//   max: any;
//   onChange?: any;
// };

export default RangeInput;
