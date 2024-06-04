

import React, { useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Player } from '@lottiefiles/react-lottie-player';
import backgroundImage from "/src/assets/images/KV 1.png" 
import logo from "/src/assets/images/Diageo Logo 1.png" 
import nodrink from "/src/assets/images/nodrink.png" 
import animation from "/src/assets/images/animationData.json" 
import errorImage from "/src/assets/images/error.png" 
import image4 from "/src/assets/images/4drinks.png"
import image3 from "/src/assets/images/3drinks.png"
import image2 from "/src/assets/images/2drinks.png"
import image1 from "/src/assets/images/1drink.png"

import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DrinkQRScanner() {
  const [showScanner, setShowScanner]=useState(true)
  const naviagate=useNavigate()
  const [data, setData] = useState();
  const [success, setSuccess]=useState(null);
  const [error, setError] = useState();
  const[showDrinkCount,setShowDrinkCount]=useState()
  const [count, setCount] = useState();
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
  const fetchUserCount = async (uniqueCode) => {
    const uniqueCodeString = String(uniqueCode).trim();
  try {
    const response = await axios.post('http://localhost:3000/api/getDrinkCount', { uniqueCode:uniqueCodeString });

    if (response.data.success) {
      setCount(response.data.remainingCount);
      setShowScanner(false);
      setData(null);
      setError(null);
      setShowDrinkCount(true);
      return
    } else {
   
      //setCount(0); // Set count to 0 to indicate no drinks remaining
      setError(response.data.message); // Set the error message received from the server
      setShowScanner(false);
      setData(null);
      console.log("here")
      setShowDrinkCount(true); // Set showDrinkCount to true to display the "No More Drinks Left" message
      return;
    
    }
  } catch (error) {
    console.log(error)
    console.error('Error fetching user count:', error);
    setError('Internal server error');
  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    setShowDrinkCount(false);
    setCount(null);
    setSuccess(null);
    setError('');
    setShowScanner(true);
    console.log("timeover");
  }, 5000);

  // Cleanup the timeout if the component unmounts or showDrinkCount changes
  return () => clearTimeout(timer);
}, [showDrinkCount]);

  
  useEffect(() => {
    console.log(">>>>",data)
    if (data !=null) {

        fetchUserCount(data)

   
    }
   
  }, [data])
 
  const getImage = (count) => {
    switch (count) {
      case 0:
        return <img alt="Logo" height="40" style={{ objectFit: 'cover' }} width="240" className="mb-6" src={nodrink}  />;
      case 1:
        return <img alt="Image 1" src={image1}  height="40" style={{ objectFit: 'cover' }} width="240" className="mb-6"  />;
      case 2:
        return <img alt="Image 2" src={image2} height="40" style={{ objectFit: 'cover' }} width="240" className="mb-6" />;
      case 3:
        return <img alt="Image 3" src={image3} height="40" style={{ objectFit: 'cover' }} width="240" className="mb-6" />;
      case 4:
        return <img alt="Image 4" src={image4} height="40" style={{ objectFit: 'cover' }} width="240" className="mb-6" />;
      default:
        return null;
    }
  };
  return (
      // <img className="w-[210px] h-[130px] pb-5 p-3 z-10 " src={logo} alt="Image Description"/>
    <div  style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      justifyContent: "center",
    }} className=" relative flex flex-col items-center justify-center h-screen ">
       <button onClick={() => naviagate('/')} className="absolute top-0 w-[210px] h-[130px] pb-5  z-10 " > <img  src={logo} alt="Image Description"/></button>
     <div className='flex flex-col items-center justify-center'>  
     <h2  onClick={() => toggleFullSceen()}  className="text-3xl font-bold tracking-tight text-white pb-5 ">Drink Scanner</h2>
        
      {!showDrinkCount ? (
        <div className=" p-20 flex flex-start  bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-3xl backdrop-filter border-opacity-30 w-[500px]  h-[800px] justify-center items-center">
          <div className="flex flex-col ">
            <div className=" aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              {/* <QrCodeIcon className="w-16 h-16 text-gray-500 dark:text-gray-400" /> */}
              {showScanner ? (
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
                  constraints={{ facingMode: 'user' }} //front camera
                  // constraints={{ facingMode: 'environment' }}  //back camera
                  className=""
                />
              ) : (
<></>
              
                // <BeerIcon className="h-6 w-6 mb-2" />
            //     <div className=' '>
            //     <BeerIcon className="w-32 h-32 text-gray-500 dark:text-gray-400" />
                
            //     {!showScanner ?
             
            //  <Button
            //   className="w-full " size='lg'
              
            //   onClick={() => setShowScanner(!showScanner)}
            // >Show Scanner
              
            // </Button>

           
            
            
            // :<></>}  </div>
                
              )}
              
            </div>
            {/* <h1 className="text-2xl font-bold mb-2 dark:text-gray-50">QR Code Scanner</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Scan any QR code to get started.</p>
          <Button className="w-full" size="lg" onClick={() => setShowScanner(!showScanner)}>
            {showScanner ? "Close Scanner" : "Show Scanner"}
          </Button> */}
            {/* <h1 className="text-2xl font-bold mb-2 dark:text-gray-50">
              QR Code Scanner
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Scan any QR code to get started.
            </p> */}
            

            
          
          </div>
        </div>
      ) : (
        //   <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-6 md:px-12">
        //   <div className="max-w-md w-full space-y-6 text-center">
        //     <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Annual Tech Conference</h1>
        //     <p className="text-lg text-gray-600 dark:text-gray-400">June 15-17, 2023 | San Francisco, CA</p>
        //     <p className="text-gray-700 dark:text-gray-300">
        //       Join us for three days of inspiring talks, hands-on workshops, and networking with industry leaders and
        //       innovators.
        //     </p>
        //     <Button className="w-full" href="/event-details" variant="primary">
        //       Learn More
        //     </Button>
        //   </div>
        // </div>
        <div className=" flex  flex-col  justify-center items-center  w-[500px]  h-[800px]   p-10 mx-10 bg-white rounded-xl bg-opacity-20 backdrop-filter backdrop-blur-sm  ">
        <div className="flex  w-full flex-col p-4 text-center justify-center items-center  md:p-16">
        
        {count ? (
        <h2 className="flex flex-col h-ful w-full justify-center  items-center text-center text-3xl text-white ">
           {getImage(count)} </h2>) :
         (
         <h2 className="flex flex-col h-ful w-full justify-center  items-center text-center text-3xl text-white ">
            {!error ? (<img
              alt="Logo"
              height="40"
              src= {nodrink}
              style={{
              
                objectFit: "cover",
              }}
              width="240"
              className='mb-6'
            />):(<> <img className='w-[150px] h-[150px]' src={errorImage} alt="Image Description"/> </>)}  </h2>)}
              <h2 className="flex flex-col h-ful w-full justify-center  items-center text-center text-3xl text-white "> {count === 0 ? "NO DRINKS LEFT" : (count === 1 ? "1 DRINK LEFT" : (count != null && count <= 4 ? `${count} DRINKS LEFT` : null))}</h2>
              {!error ? (<p className="text-white dark:text-white text-2xl flex flex-col justify-center items-center gap-5 mt-5">   Stay Hydrated at all times! </p>):<></>}
             
             
            

</div>
          {/* <span className="mt-4 text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 sm:text-[200px] md:text-[250px]">
            { count <= 4  ? (count !=0 &&(count) ): error}
          </span> */}
          {error && <div className='flex flex-col'>
          
          <p
    className="flex flex-col h-ful w-full justify-center  items-center text-center text-3xl text-white "
  >{error}</p> </div>}

  
         
        </div>
       
      )}
      </div> 
    </div>
  );
}

// function QrCodeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="5" height="5" x="3" y="3" rx="1" />
//       <rect width="5" height="5" x="16" y="3" rx="1" />
//       <rect width="5" height="5" x="3" y="16" rx="1" />
//       <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
//       <path d="M21 21v.01" />
//       <path d="M12 7v3a2 2 0 0 1-2 2H7" />
//       <path d="M3 12h.01" />
//       <path d="M12 3h.01" />
//       <path d="M12 16v.01" />
//       <path d="M16 12h1" />
//       <path d="M21 12v.01" />
//       <path d="M12 21v-1" />
//     </svg>
//   )
// }


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