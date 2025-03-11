import React from "react";
import { Link } from "react-router-dom";
import ArrowLeft from "../ui/icons/ArrowLeft";
import DayInfo from "../ui/DayInfo";

export default function Summary({ date, len, avg, min, max, duration, form}) {
    return(
        <header className="mx-auto px-2 pt-5 border-b pb-10">
            <div>
                <Link to="/dashboard">
                    <ArrowLeft />
                </Link>
                <h1 className="text-2xl text-center font-bold mb-3">New Record</h1>
            </div>
            <div className="w-1/2 mx-auto">
                <DayInfo date={date} len={len} avg={avg} min={min} max={max} duration={duration} form={form} />
            </div>
        </header>
);
}