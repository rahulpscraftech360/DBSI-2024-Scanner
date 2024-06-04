// import React, { useState } from 'react';
// import { Scanner } from '@yudiel/react-qr-scanner';

// const QrCodeScanner = () => {
//   const [data, setData] = useState("No result");

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md mx-auto">
//         <Scanner
//           onScan={(result) => {
//             if (result && result[0]) {
//               console.log(result[0].rawValue);
//               setData(result[0].rawValue);
//             }
//           }}
//           onError={(error) => {
//             console.error(error);
//           }}
//           constraints={{ facingMode: 'environment' }}
//           className="w-full h-auto"
//         />
//       </div>
//       <div className="mt-4 p-2 bg-white rounded shadow-md w-full max-w-md">
//         <p className="text-lg font-medium">Scanned Result:</p>
//         <p className="text-gray-800 break-words">{data}</p>
//       </div>
//     </div>
//   );
// };

// export default QrCodeScanner;



/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DEy8wvOXGB1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React, { useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import backgroundImage from "/src/assets/images/KV 1.png" 

import logo from "/src/assets/images/Diageo Logo 1.png" 
import right from "/src/assets/images/right.png" 
import errorImage from "/src/assets/images/error.png" 

import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function QrCodeScanner() {
  const [showScanner, setShowScanner]=useState(true)
  const [data, setData] = useState();
  const[user,setUser]=useState(null);
  const [error, setError] = useState();
  const[showWelcome,setShowWelcome]=useState(false)
  const [fullscreen, setFullscreen] = useState(false);
 
  const toggleFullSceen = () => {
    if (!document.fullscreenElement) {
      console.log(document.documentElement.requestFullscreen());
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };
  console.log("error",error)
  const handleGetUser = async (uniqueCode) => {
    const uniqueCodeString = String(uniqueCode).trim();
    
    try {
      const response = await axios.post('http://localhost:3000/api/getUser', { uniqueCode:uniqueCodeString });

      if (response.status === 200) {
        if (response.data.success) {
          setUser(response.data.user);
          setShowScanner(false);
          setData(null);
          setError(null);
          setShowWelcome(true);
          return;
        } else {
          setError(response.data.message);
          setShowWelcome(true);
          return;
        }
      } else if (response.status === 404) {
        console.log(">>>>>>")
        setError('Invalid QR');
        setShowWelcome(false);
        return;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
       setError('Internal server error');
    
    }
  };
 const naviagate=useNavigate()
  useEffect(() => {
   
    setTimeout(() => {
      setShowWelcome(false)
      setError();
      setShowScanner(true);
    }, 5000);
  }, [showWelcome,error])

  
  useEffect(() => {
    console.log(">>>>",data)
    if (data !=null) {

      handleGetUser(data)}

   
  
   
  }, [data])
  
  return (
    <div  style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      justifyContent: "center",
    }} className="relative flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-950">
      <div className="hidden sm:flex w-full justify-start ">
            {/* <button
              className="py-2 mt-5 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              onClick={() => naviagate('/')}
            >
              Home
            </button> */}
          </div>
          <button onClick={() => naviagate('/')} className="absolute top-0 w-[210px] h-[130px] pb-5 p-3 z-10 " > <img  src={logo} alt="Image Description"/></button>
          <h2  onClick={() => toggleFullSceen()} className="text-3xl font-bold tracking-tight text-white pb-5 md:mt-14 md:pt-10 ">Welcome Scanner</h2>
      {/* {error && (
        <p className="mt-4 text-red-500 text-center font-bold">{error}</p>
      )} */}
     {!showWelcome ? (<div className="  w-[500px]  h-[800px]  max-w-md p-10 mx-10  bg-white rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-sm flex flex-col justify-center items-center">
   
        <div className="">
          <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">

         
            {/* <QrCodeIcon className="w-16 h-16 text-gray-500 dark:text-gray-400" /> */}
          
          
   


          
            {showScanner? <Scanner  
          onScan={(result) => {
            if (result && result[0]) {
              console.log(result[0].rawValue);
              setData(result[0].rawValue);
            }
          }}
          onError={(error) => {
            console.error(error);
          }}
          constraints={{ facingMode: 'user' }} //front camera
          // constraints={{ facingMode: 'environment' }}  //back camera
          className="w-full h-auto rounded-lg p-2"
        />:<QrCodeIcon className="w-16 h-16 text-gray-500 dark:text-gray-400" /> }
          </div>
          {/* <h1 className="text-2xl font-bold mb-2 dark:text-gray-50">QR Code Scanner</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Scan any QR code to get started.</p> */}
          {/* <Button className="w-full" size="lg" onClick={() => setShowScanner(!showScanner)}>
            {showScanner ? "Close Scanner" : "Show Scanner"}
          </Button> */}

          {/* <p className="text-lg font-medium dark:text-gray-50">Scanned Result:</p>
          <p className="text-gray-800 dark:text-gray-200 break-words">{data}</p> */}
        </div>
      </div>):
      //showing welcome screen
      ( <div className=" w-[500px]  h-[800px] flex gap-2 max-w-md p-10 mx-10 bg-white rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-sm">
      <div className="w-full flex flex-col  justify-center items-center gap-5 ">
      
     
        {/* <p className="text-lg text-gray-600 dark:text-gray-400">June 15-17, 2023 | San Francisco, CA</p> */}
       {error?(<>  <img className="w-[150px] h-[150px] text-white dark:text-white " src={errorImage} alt="Image Description"/><p className='text-white dark:text-white text-2xl'>{error}</p></>):(<> <img className="w-[150px] h-[150px] " src={right} alt="Image Description"/><p className="text-white dark:text-white text-2xl flex flex-col justify-center items-center gap-5">
       <div>Welcome to</div>
       <div> DBSI Annual Day 2024</div>
        </p></>)} 
        {/* <Button className="w-full" href="/event-details" variant="primary">
          
        </Button> */}
      </div>
    </div>)}
    </div>
  )
}

function QrCodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  )
}