import React from "react";
import AboutDevice from "../device/AboutDevice";
import MenuButton from "./buttons/MenuButton";

export default function LeftBlock({ onNewDataAvailable, address, deviceConnected, onDisconnectDevice }) {
    return(
        <div className="w-1/3">
            <div className="w-full">
                <MenuButton text={"Dashboard"} link="/dashboard" selected={address === "/dashboard"} icon={"records"} />
                <MenuButton text={"Shared Access"} link="/sharedAccess" selected={address === "/sharedAccess"} icon={"shared"} />
            </div>
            <AboutDevice onNewDataAvailable={onNewDataAvailable} deviceConnected={deviceConnected} onDisconnectDevice={onDisconnectDevice} />
        </div>
    );
}