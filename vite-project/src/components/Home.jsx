import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player';
import backgroundImage from "/src/assets/images/KV 1.png"
import logo from "/src/assets/images/Diageo Logo 1.png" 
import { Button } from "@/components/ui/button"
import animationData from '/src/assets/images/animationData.json';
import animationData2 from '/src/assets/images/animation2.json';
import svg from "/src/assets/images/wired-lineal-20-love-heart.svg"
import { AlignCenter } from 'lucide-react';
//import backgroundImage from "/src/assets/background.png";

export default function Home() {
  const [fullscreen, setFullscreen] = useState(false);
  const navigate = useNavigate();
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
  return (
    <main
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        justifyContent: "center",
      }}
      className="relative flex flex-col items-center justify-center h-screen w-full bg-gray-100 dark:bg-gray-900"
    > <button onClick={() => navigate('/')} className="absolute top-0 w-[210px] h-[130px] pb-5 p-3 z-10 " > <img  src={logo} alt="Image Description"/></button>
     
      <div className="container grid grid-cols-2 gap-4 sm:grid-cols-2">
        {/* <Player
          src={animationData2}
          className="player"
          loop
          autoplay
          // background="red"c:\Users\rahul\Downloads\KV 1.png
          style={{ height: "100px", width: "100px" }}
        /> */}
        {/* <image src={svg} /> */}

        {/* {!fullscreen && (
          <div className="hidden sm:flex w-full justify-start">
            <button
              className="py-2 mt-5 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            
            >
              Full Screen
            </button>
          </div>
        )}
        {fullscreen && (
          <div className="flex w-full justify-start">
            <button
              className="w-1/4 py-2 mt-5 px-4 bg-transparent border-transparent text-sm font-medium rounded-md "
              onClick={() => toggleFullSceen()}
            >
              {" "}
            </button>
          </div>
        )} */}
        <Button
          onClick={() => toggleFullSceen()}
          className="flex flex-col items-center justify-center h-24 sm:h-32  bg-white  bg-opacity-20 backdrop-filter backdrop-blur-sm text-white"
          variant="outline"
        >
          <MaximizeIcon className="h-6 w-6 mb-2" />
          <span>Fullscreen</span>
        </Button>
        <Button
          onClick={() => {
            navigate("/welcome-scanner");
          }}
          className="flex flex-col items-center justify-center h-24 sm:h-32  bg-white  bg-opacity-20 backdrop-filter backdrop-blur-sm text-white"
          variant="outline"
        >
          <QrCodeIcon className="h-6 w-6 mb-2" />
          <span>
            {" "}
            <Link to="/welcome-scanner">Welcome Scanner</Link>
          </span>
        </Button>
        <Button
          onClick={() => {
            navigate("/drink-scanner");
          }}
          className="flex flex-col items-center justify-center h-24 sm:h-32  bg-white  bg-opacity-20 backdrop-filter backdrop-blur-sm text-white"
          variant="outline"
        >
          <BeerIcon className="h-6 w-6 mb-2" />
          <span>
            {" "}
            <Link to="/drink-scanner">Drink Scanner</Link>
          </span>
        </Button>
        <Button
          onClick={() => {
            navigate("/cancel-qr");
          }}
          className="flex flex-col items-center justify-center h-24 sm:h-32  bg-white  bg-opacity-20 backdrop-filter backdrop-blur-sm text-white"
          variant="outline"
        >
          <XIcon className="h-6 w-6 mb-2" />
          <span>
            {" "}
            <Link to="/cancel-qr">Cancel QR</Link>
          </span>
        </Button>
      </div>
    </main>
  );
}

function BeerIcon(props) {
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
      <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
      <path d="M9 12v6" />
      <path d="M13 12v6" />
      <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
      <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
    </svg>
  )
}


function MaximizeIcon(props) {
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
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
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


function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}