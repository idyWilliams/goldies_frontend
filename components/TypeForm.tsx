"use client";

import { Widget } from "@typeform/embed-react";
import "@typeform/embed/build/css/widget.css";

const TypeForm = () => {
  return (
    <>
      <div className="h-[800px] w-full sm:h-[800px] lg:h-[500px]">
        <Widget id="waun0Oly" className="h-full w-full" />
        {/* 
      <PopupButton
        id="<form-id>"
        style={{ fontSize: 20 }}
        className="my-button bg-main"
      >
        click to open form in popup
      </PopupButton>

      <Sidetab id="<form-id>" buttonText="click to open" /> */}

        {/* <iframe
        title="My Typeform"
        id="typeform-full"
        width="100%"
        height="100%"
        src="https://vfhn0wpfeec.typeform.com/to/waun0Oly?disable-auto-focus=true"
      ></iframe> */}
      </div>
    </>
  );
};

export default TypeForm;
