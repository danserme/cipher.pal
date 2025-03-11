import React, { useState, useEffect } from "react";
import ImagePlaceholder from "./icons/ImagePlaceholder";
import Popup from "./Popup";

export default function Header({ deviceConnected, newDataAvailable, newRequest, connectionStatus }) {
  const [showNoDataPopup, setShowNoDataPopup] = useState(false);
  const [wasConnected, setWasConnected] = useState(false);
  
  useEffect(() => {
    // If device becomes connected, record it
    if (deviceConnected) {
      setWasConnected(true);
    }
    
    // If device was connected but is now disconnected and there's no data to upload
    if (wasConnected && !deviceConnected && !newDataAvailable) {
      setShowNoDataPopup(true);
      
      // Hide the popup after 8 seconds
      const timer = setTimeout(() => {
        setShowNoDataPopup(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [deviceConnected, newDataAvailable, wasConnected]);
  
  // If connection status changes to disconnected and we were previously connected,
  // reset the wasConnected state after a delay
  useEffect(() => {
    if (connectionStatus === "disconnected" && wasConnected) {
      const timer = setTimeout(() => {
        setWasConnected(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [connectionStatus, wasConnected]);
  
  return (
    <header className="flex justify-start content-center px-10 gap-10 mt-5 mb-10">
      <div className="w-1/3 bg-gray-200 my-auto py-4 rounded-full">
        <ImagePlaceholder />
      </div>
      <div className="w-full self-center">
        {/* Show only one popup at a time, with priority */}
        {showNoDataPopup && <Popup reason="noData" />}
        {!showNoDataPopup && !deviceConnected && <Popup reason="preview" />}
        {!showNoDataPopup && newDataAvailable && <Popup reason="newData" />}
        {newRequest && <Popup reason="newReq" />}
      </div>
    </header>
  );
}