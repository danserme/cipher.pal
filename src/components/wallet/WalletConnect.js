import React, { useEffect } from "react";
import { useWallet } from "../../WalletContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function WalletConnect() {
  const navigate = useNavigate();
  const {
    isMetaMaskInstalled,
    isConnected,
    isCorrectNetwork,
    connectWallet,
    switchNetwork,
    isLoading,
    networkName
  } = useWallet();

  // Redirect if all conditions are met (connected and correct network)
  useEffect(() => {
    if (!isLoading && isConnected && isCorrectNetwork) {
      navigate('/');
    }
  }, [isLoading, isConnected, isCorrectNetwork, navigate]);

  // Show loading state while we check MetaMask status
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-6">Checking Wallet Status</h1>
          <p>Please wait while we check your wallet configuration...</p>
        </div>
      </div>
    );
  }

  // Handle button click based on current state
  const handleConnect = async () => {
    console.log("Connect button clicked");
    
    if (!isConnected) {
      const connected = await connectWallet();
      if (connected && !isCorrectNetwork) {
        await switchNetwork();
      }
    } else if (!isCorrectNetwork) {
      await switchNetwork();
    }
  };

  // Determine button text and action state
  let buttonText = "Connect";
  let statusMessage = "";
  
  if (!isMetaMaskInstalled) {
    buttonText = "Install MetaMask";
    statusMessage = "MetaMask is not installed. Please install MetaMask to continue.";
  } else if (!isConnected) {
    buttonText = "Connect Wallet";
    statusMessage = "Please connect your wallet to continue.";
  } else if (!isCorrectNetwork) {
    buttonText = `Switch to ${networkName}`;
    statusMessage = `Please switch to ${networkName} network to continue.`;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Connect Your Wallet
        </h1>
        <div className="text-center mb-6">
          <p>{statusMessage}</p>
        </div>
        
        {!isMetaMaskInstalled ? (
          <a
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            {buttonText}
          </a>
        ) : (
          <button
            onClick={handleConnect}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            {buttonText}
          </button>
        )}

        {/* MetaMask status debugging */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">Wallet Status:</h3>
          <p>MetaMask Installed: {isMetaMaskInstalled ? "Yes" : "No"}</p>
          <p>Connected: {isConnected ? "Yes" : "No"}</p>
          <p>Correct Network: {isCorrectNetwork ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}