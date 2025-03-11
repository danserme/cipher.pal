import React, { useState } from "react";
import data from "../../utils/ui_data.json";
import GhostButton from "./buttons/GhostButton";
import Close from "./icons/Close";

export default function Popup({ reason }) {
  const popup = data.popups[`${reason}`];
  const [isClose, setClose] = useState(false);
  
  if(isClose) {
    return null;
  }
  
  const handleClose = () => {
    setClose(true);
  };
  
  return(
    <div className="w-full p-2 flex justify-between bg-amber-200 border-2 border-amber-400 text-amber-700 font-semibold">
      <h4>{popup.text}</h4>
      <div className="flex gap-4">
        <div className="flex gap-4">
          {popup.buttons.map((el, index) => {
            return(<GhostButton text={el.text} link={el.link} key={index} />)
          })}
        </div>
        <div 
          onClick={handleClose} 
          className="cursor-pointer hover:bg-amber-300 rounded-full p-1 transition-colors"
        >
          <Close />
        </div>
      </div>
    </div>
  );
}