import React, { useCallback, useEffect, useState, useRef } from "react";

const RangeInput = ({ min, max, onChange }: RangeInputProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
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
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="contain">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        // style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">
          <input
            value={`₦ ${minVal}`}
            min={min}
            max={max}
            style={{ width: "80px", height: "30px", marginLeft: "-10px" }}
            className="border-[#197B30] text-[#333]"
            onChange={(e) => {
              setMinVal(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="slider__right-value">
          <input
            value={`₦ ${maxVal}`}
            min={min - 1}
            max={max}
            className="border-[#197B30] text-[#333]"
            style={{ width: "80px", height: "30px", marginLeft: "-10px" }}
            onChange={(e) => {
              setMaxVal(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
};

type RangeInputProps = {
  min: number;
  max: number;
  onChange: any;
};

export default RangeInput;
