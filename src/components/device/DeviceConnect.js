import React, { useEffect } from "react";
import Image from "../ui/Image";
import GhostButton from "../ui/buttons/GhostButton";
import { Navigate } from "react-router-dom";
import { useSerialPort } from "../../SerialPortContext";
import { useWallet } from "../../WalletContext";

export default function DeviceConnect() {
  // Get the closePortAfterInit function from context
  const { 
    deviceConnected, 
    connectionStatus, 
    connectReadSerial, 
    deviceWallet,
    closePortAfterInit 
  } = useSerialPort();
  const { account } = useWallet();
  
  // Use effect to detect "initialized" state and close the port
  useEffect(() => {
    if (connectionStatus === "initialized") {
      console.log("Device initialized, closing port in 1 second...");
      
      // Give the device a moment to process before closing
      const timer = setTimeout(() => {
        closePortAfterInit();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [connectionStatus, closePortAfterInit]);
  
  // If already connected AND not in initialized state, go to records
  // We only want to navigate away if we're fully connected, not just initialized
  if (deviceConnected === true && connectionStatus === "connected") {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Function to handle connect button click
  const handleConnect = () => {
    connectReadSerial(account);
  };
  
  // Generate appropriate status message
  let statusMessage = "Ready to connect";
  let statusDetails = "Make sure your device is connected to your laptop via USB.";
  let buttonDisabled = false;
  let errorState = false;
  
  switch (connectionStatus) {
    case "connecting":
      statusMessage = "Connecting to Smart Fidget...";
      statusDetails = "Please wait while we establish a connection.";
      buttonDisabled = true;
      break;
    case "authenticating":
      statusMessage = "Authenticating device...";
      statusDetails = "Verifying your wallet with the device.";
      buttonDisabled = true;
      break;
    case "connected":
      statusMessage = "Device connected!";
      statusDetails = "Redirecting to your records...";
      buttonDisabled = true;
      break;
    case "initialized":
      statusMessage = "Device initialized successfully!";
      statusDetails = "Your wallet has been registered with the device. Connection will close automatically.";
      buttonDisabled = true;
      break;
    case "wallet_mismatch":
      statusMessage = "Wallet Mismatch Error";
      statusDetails = `This device is registered to another wallet (${deviceWallet?.substring(0, 6)}...${deviceWallet?.substring(deviceWallet.length - 4)}). Please connect with the original wallet.`;
      errorState = true;
      break;
    default:
      // Uses default values set above
      break;
  }
  
  return (
    <div className="justify-center text-center">
      <div className="w-1/3 bg-gray-200 p-20 my-20 mx-auto rounded-full">
        <Image />
      </div>
      <h3 className={`text-lg font-semibold ${errorState ? 'text-red-600' : connectionStatus === "initialized" ? 'text-green-600' : ''}`}>
        {statusMessage}
      </h3>
      <p className={`p-1 italic ${errorState ? 'text-red-500' : connectionStatus === "initialized" ? 'text-green-500' : ''}`}>
        {statusDetails}
      </p>
      {account ? (
        <p className="mt-2 text-sm text-gray-600">
          Connected wallet: {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </p>
      ) : null}
      <button
        className={`w-1/3 mt-10 mx-auto p-2 font-semibold
          ${buttonDisabled
            ? connectionStatus === "initialized" ? 'bg-green-400 text-white cursor-default' : 'bg-gray-400 text-gray-100 cursor-not-allowed'
            : errorState
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        onClick={handleConnect}
        disabled={buttonDisabled}
      >
        {buttonDisabled
          ? connectionStatus === "initialized" ? 'Device Ready!' : 'Connecting...'
          : errorState
          ? 'Try Different Wallet'
          : 'Connect Device'}
      </button>
      <div className="mt-5 text-indigo-700">
        <GhostButton
          text={"Continue without Device"}
          link={"/dashboard"}
        />
      </div>
    </div>
  );
}