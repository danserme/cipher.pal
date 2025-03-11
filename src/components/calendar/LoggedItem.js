import React from "react";
import Tag from "../ui/Tag";
import Heartbeat from "../ui/Heartbeat";
import GhostButton from "../ui/buttons/GhostButtonSmall";

export default function LoggedItem({ session }) {
  console.log("Rendering LoggedItem with session:", session);

  if (!session) {
    return null;
  }

  // Extract data from the session prop based on your actual data structure
  const {
    id,
    min = 0,
    max = 0, 
    avg = 0,
    duration = 0,
    startTime,
    endTime,
    tags = [],
    notes = ""
  } = session;

  // Format time range
  let timeRange = "Time not available";
  
  // If startTime and endTime exist as timestamps
  if (startTime && endTime) {
    timeRange = `${startTime} - ${endTime}`;
  } 
  // If we have duration in milliseconds, calculate a time range based on duration
  else if (duration) {
    // Convert duration from milliseconds to minutes
    const durationMinutes = Math.round(duration / 60000);
    timeRange = `${durationMinutes} min session`;
  }

  // Truncate notes for preview
  const truncatedNotes = notes && notes.length > 60 
    ? `${notes.substring(0, 60)}...` 
    : notes;

  // If session has tags array, use it, otherwise create a temporary array with mood tags
  const sessionTags = tags && tags.length > 0 
    ? tags 
    : (session.mood ? [session.mood] : []);

  return (
    <div className="py-3 px-5 border-2 my-3">
      <div className="flex font-bold justify-between">
        <h1>{timeRange}</h1>
        <Heartbeat text={"avg"} val={avg} />
      </div>
      <div className="flex w-full justify-between my-3">
        <div className="flex flex-wrap items-center text-nowrap gap-3 text-xs">
          {sessionTags.length > 0 ? (
            sessionTags.map((tag, index) => (
              <Tag key={index} tag={tag} selectable={false} />
            ))
          ) : (
            <Tag tag={"No tags"} selectable={false} />
          )}
        </div>
        <div className="text-sm">
          <Heartbeat text={"max"} val={max} />
          <Heartbeat text={"min"} val={min} />
        </div>
      </div>
      <p>{truncatedNotes || "No notes for this session."}</p>
      <div className="w-full text-right">
        <GhostButton text={"more"} />
      </div>
    </div>
  );
}