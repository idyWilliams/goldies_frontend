import React, { useCallback, useEffect, useState, useRef } from "react";
import "../../styles/rangeInput.css";
import { twMerge } from "tailwind-merge";
import { relative } from "path";
import { number } from "yup";

const RangeInput = ({ min, max, onChange }: RangeInputProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [rangeVal, setRangeVal] = useState<{ min: number; max: number }>({
    min: min,
    max: max,
  });
  const minValRef = useRef<any>(min);
  const maxValRef = useRef<any>(max);
  const range = useRef<any>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: any) => Math.round(((value - min) / (max - min)) * 100),
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
  // useEffect(() => {
  //   onChange({ min: minVal, max: maxVal });
  // }, [minVal, maxVal, onChange]);

  const handleChange = () => {};

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
        className={twMerge(
          "thumb pointer-events-none absolute z-[3] h-0 w-[260px] outline-0",
        )}
        // style={{ zIndex: minVal > max - 100 && "5" }}
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
        className={twMerge(
          "thumb pointer-events-none absolute z-[4] h-0 w-[260px] outline-0",
        )}
      />

      <div className={twMerge("relative w-[260px]")}>
        <div
          className={twMerge(
            "absolute z-[1] h-[5px] w-full rounded bg-neutral-400",
          )}
        />
        <div
          ref={range}
          className={twMerge("absolute z-[2] h-[5px] rounded bg-neutral-900")}
        />
        <div
          className={twMerge(
            "absolute left-[3px] mt-5 text-xs text-neutral-300",
          )}
        >
          <input
            id="minVal"
            name="minVal"
            value={`€ ${minVal}`}
            min={min}
            max={max}
            disabled
            className="form-input inline-block w-[80px] rounded-2xl border-neutral-400 text-center text-[#333] focus:border-neutral-900 focus:ring-neutral-900 disabled:border-neutral-300 disabled:text-neutral-400"
            onChange={(e) => setMinVal(parseInt(e.target.value) || 0)}
          />
        </div>
        <div
          className={twMerge(
            "absolute -right-[4px] mt-5 text-xs text-neutral-300",
          )}
        >
          <input
            id="maxVal"
            name="maxVal"
            value={`€ ${maxVal}`}
            min={min - 1}
            max={max}
            disabled
            className="form-input inline-block w-[80px] rounded-2xl border-neutral-400 text-center text-[#333] focus:border-neutral-900 focus:ring-neutral-900 disabled:border-neutral-300 disabled:text-neutral-400"
            onChange={(e) => setMaxVal(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

type RangeInputProps = {
  min: any;
  max: any;
  onChange?: any;
};

export default RangeInput;
