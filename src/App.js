import React, { useState, useEffect } from "react";
import Calendar from "./components/calendar/Calendar";
import NewData from "./components/submitData/NewData";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import DeviceConnect from "./components/device/DeviceConnect";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import LeftBlock from "./components/ui/LeftBlock";
import SharedAccess from "./components/shared/SharedAccess";
import { SerialPortProvider, useSerialPort } from "./SerialPortContext";
import { WalletProvider, useWallet } from "./WalletContext";
import WalletConnect from "./components/wallet/WalletConnect";



function AppContent() {
  const [newDataAvailable, setNewDataAvailable] = useState(true);
  const [newRequest, setNewRequest] = useState(false);
  const { 
    connectReadSerial, 
    disconnectDevice, 
    data, 
    deviceConnected, 
    connectionStatus,
    hasDataToUpload 
  } = useSerialPort();
  const { 
    isMetaMaskInstalled, 
    isConnected, 
    isCorrectNetwork, 
    isLoading, 
    account 
  } = useWallet();

  // Update newDataAvailable based on hasDataToUpload
  useEffect(() => {
    setNewDataAvailable(hasDataToUpload);
  }, [hasDataToUpload]);

  // Set up timer for random new request appearance
  useEffect(() => {
    // Only set the timer if the user is logged in and connected
    if (isConnected && account) {
      // Generate random time between 0-1 minute (0-60000 ms)
      const randomTime = Math.floor(Math.random() * 60000);
      
      console.log(`New request will appear in ${randomTime/1000} seconds`);
      
      const timer = setTimeout(() => {
        setNewRequest(true);
        console.log("New access request has arrived!");
      }, randomTime);
      
      // Clean up timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [isConnected, account]);

  // Connect serial when wallet changes
  useEffect(() => {
    // If wallet is connected and there is an account, but device not yet connected
    if (isConnected && account && !deviceConnected && connectionStatus === "disconnected") {
      console.log("Wallet connected, device can be connected with account:", account);
    }
  }, [isConnected, account, deviceConnected, connectionStatus, connectReadSerial]);

  // Display loading state while checking wallet status
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading wallet status...</p>
      </div>
    );
  }
  
  // Check for MetaMask installation
  if (!isMetaMaskInstalled) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-6">MetaMask Required</h1>
          <p className="mb-6">Please install MetaMask to use this application.</p>
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full inline-block py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none"
          >
            Install MetaMask
          </a>
        </div>
      </div>
    );
  }

  // If not on connect page, check wallet connection
  const currentPath = window.location.pathname;
  if (currentPath !== '/connect' && (!isConnected || !isCorrectNetwork)) {
    return <Navigate to="/connect" />;
  }

  return (
    <div>
      <Routes>
        <Route path="/connect" element={<WalletConnect />} />
        <Route
          path="/"
          element={
            <DeviceConnect
              onDeviceConnected={deviceConnected}
              onConnectSerial={() => connectReadSerial(account)}
              connectionStatus={connectionStatus}
              walletAddress={account}
              hasDataToUpload={hasDataToUpload}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Header
                deviceConnected={deviceConnected}
                newDataAvailable={newDataAvailable}
                newRequest={newRequest}
                connectionStatus={connectionStatus}
              />
              <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                <LeftBlock 
                  deviceConnected={deviceConnected}
                  onNewDataAvailable={newDataAvailable} 
                  address={"/dashboard"} 
                  onDisconnectDevice={disconnectDevice}
                />
                <Calendar />
              </div>
            </>
          }
        />
        <Route
          path="/addData"
          element={
            <>
              <Header 
                deviceConnected={deviceConnected} 
                newRequest={newRequest}
                newDataAvailable={newDataAvailable}
                connectionStatus={connectionStatus}
              />
              <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                <LeftBlock 
                  deviceConnected={deviceConnected}
                  onNewDataAvailable={newDataAvailable} 
                  address={"/dashboard"} 
                  onDisconnectDevice={disconnectDevice}
                />
                <NewData
                  data={data}
                  onDisconnectDevice={disconnectDevice}
                  onSetNewDataAvailable={setNewDataAvailable}
                  deviceConnected={deviceConnected}
                  connectionStatus={connectionStatus}
                  hasDataToUpload={hasDataToUpload}
                />
              </div>
            </>
          }
        />
        <Route
          path="/sharedAccess"
          element={
            <>
              <Header 
                deviceConnected={deviceConnected} 
                newRequest={newRequest}
                newDataAvailable={newDataAvailable}
                connectionStatus={connectionStatus}
              />
              <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                <LeftBlock 
                  deviceConnected={deviceConnected}
                  onNewDataAvailable={newDataAvailable} 
                  address={"/sharedAccess"} 
                  onDisconnectDevice={disconnectDevice}
                />
                <SharedAccess hasNewRequest={newRequest} onRequestHandled={() => setNewRequest(false)} />
              </div>
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <WalletProvider>
        <SerialPortProvider>
            <AppContent />
        </SerialPortProvider>
      </WalletProvider>
    </Router>
  );
}