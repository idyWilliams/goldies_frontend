import React, { useEffect, useState } from "react";
import moment from "moment";

const CurrentTime = ({ text, isOpen }: { text: string; isOpen?: boolean }) => {
  const [currentTime, setCurrentTime] = useState(moment().format("H:mm"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("H:mm")), 60000;
    });

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <span className={`text-sm font-normal ${text} `}>
        {moment().format("ddd D MMM")}
      </span>
      {isOpen && <span>-</span>}
      <span className={`text-sm font-normal ${text} `}>{currentTime}</span>
    </>
  );
};

{
  /* <span className="text-sm font-normal text-black">
                    {moment().format("ddd D MMM")}
                  </span>
                  <span>-</span>
                  <span className="text-sm font-normal text-black">
                    {currentTime}
                  </span> */
}

export default CurrentTime;
