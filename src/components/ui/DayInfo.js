import React from "react";
import Heartbeat from "../ui/Heartbeat";
import Explorer from "./icons/Explorer";

export default function DayInfo({ date, len = 0, avg = 0, min = 0, max = 0, duration = 0, dataId, form = false }) {
  // Construct URL for Polygon zkEVM Cardona Testnet explorer
  const getPolygonZkEvmExplorerUrl = () => {
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    
    if (contractAddress && !form) {
      // Using the Polygon zkEVM Cardona Testnet explorer
      return `https://cardona-zkevm.polygonscan.com/address/${contractAddress}`;
    }
    return null;
  };
  
  const explorerUrl = getPolygonZkEvmExplorerUrl();

  return (
    <div className="mb-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <b className="font-semibold text-lg">{date}</b>
          {explorerUrl && (
            <a 
              href={explorerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
              title="View on Polygon zkEVM Explorer"
            >
              <Explorer />
            </a>
          )}
        </div>
        <Heartbeat text={"avg"} val={avg} />
      </div>
      <div className="w-full flex justify-between">
        <p>You fidgeted {len} times</p>
        <Heartbeat text={"min"} val={min} />
      </div>
      <div className="w-full flex justify-between">
        <p>Total duration of {duration}s</p>
        <Heartbeat text={"max"} val={max} />
      </div>
    </div>
  );
}