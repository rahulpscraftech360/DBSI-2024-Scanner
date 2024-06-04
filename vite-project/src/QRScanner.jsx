import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Player } from '@lottiefiles/react-lottie-player';
const QrCodeScanner = () => {
  const [data, setData] = useState("No result");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md mx-auto">
        <Scanner
          onScan={(result) => {
            if (result && result[0]) {
              console.log(result[0].rawValue);
              setData(result[0].rawValue);
            }
          }}
          onError={(error) => {
            console.error(error);
          }}
          constraints={{ facingMode: 'environment' }}
          className="w-full h-auto"
        />
      </div>
      <div className="mt-4 p-2 bg-white rounded shadow-md w-full max-w-md">
        <p className="text-lg font-medium">Scanned Result:</p>
        <p className="text-gray-800 break-words">{data}</p>
      </div>
    </div>
  );
};

export default QrCodeScanner;
