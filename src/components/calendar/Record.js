import React from "react";
import dayjs from "dayjs";
import LoggedItem from "./LoggedItem";
import DayInfo from "../ui/DayInfo";

export default function Record({ sessions = [], date, details = {} }) {
    // Ensure date is properly formatted even if it's not a dayjs object
    const formattedDate = date 
        ? (dayjs.isDayjs(date) ? date.toDate().toDateString() : dayjs(date).toDate().toDateString())
        : "No date selected";

    if (sessions && sessions.length > 0) {
        return (
            <div>
                <DayInfo 
                    date={details.date || formattedDate} 
                    len={details.len || 0}
                    avg={details.avg || 0} 
                    min={details.min || 0} 
                    max={details.max || 0} 
                    duration={details.totDuration || 0} 
                />
                {sessions.map((session, index) => (
                    <LoggedItem session={session} key={index} />
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="font-semibold text-lg">{formattedDate}</h1>
                <p>Unfortunately, there are no sessions recorded for that day.</p>
            </div>
        );
    }
}