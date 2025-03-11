import React, { useState } from "react";
import NewRequestItem from "./NewRequestItem";
import SharedAccessItem from "./SharedAccessItem";

// Note: Component name is capitalized (React convention)
export default function SharedAccess() {
  // State to track if the request is pending (true) or has been handled (false)
  const [showRequest, setShowRequest] = useState(true);
  // State to store the accepted request data (if accepted)
  const [acceptedRequest, setAcceptedRequest] = useState(null);

  // Handler for Accept button
  const handleAccept = (name, role) => {
    // Store the request data for rendering a new SharedAccessItem
    setAcceptedRequest({ fullname: name, role: role });
    // Hide the request
    setShowRequest(false);
  };

  // Handler for Decline button
  const handleDecline = () => {
    // Simply hide the request
    setShowRequest(false);
  };

  return (
    <div className="w-full p-5 border-2 h-full pb-10">
      <h1 className="text-2xl font-semibold text-center mb-7">Shared Access</h1>
      
      {/* Conditionally render the NewRequestItem */}
      {showRequest && (
        <NewRequestItem 
          fullname="Mario Ricco"
          role="doctor"
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      
      {/* Render the newly accepted request if it exists */}
      {acceptedRequest && (
        <SharedAccessItem 
          fullname={acceptedRequest.fullname} 
          role={acceptedRequest.role} 
          last="just now" 
        />
      )}
      
      {/* Existing SharedAccessItems */}
      <SharedAccessItem />
      <SharedAccessItem fullname={"Maria Perez"} role={"therapist"} last="today" />
    </div>
  );
}