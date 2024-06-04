import React, { useEffect, useState } from 'react'



import { Input } from "@/components/ui/input"
import logo from "/src/assets/images/Diageo Logo 1.png" 
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "/src/assets/images/KV 1.png"

export default function CancelQR() {
const [uniqueCode, setUniqueCode]=useState()
const [error, setError] = useState('');
const [success, setSuccess] = useState();
const navigate=useNavigate()
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
const cancelQrcode = async (uniqueCode) => {
  const uniqueCodeString = String(uniqueCode).trim();
  try {
    const response = await axios.post('http://localhost:3000/api/cancelQR', { uniqueCode: uniqueCodeString });
    if (response.status === 200) {
      if (response.data.success) {
        setSuccess(true);
        setError('');
      } else {
        setError(response.data.message);
        setSuccess(false);
      }
    } else if (response.status === 404) {
      setError('Invalid QR code');
      setSuccess(false);
    }
  } catch (error) {
    console.error('Error canceling QR code:', error);
    setError('Internal server error');
    setSuccess(false);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  cancelQrcode(uniqueCode);
};


useEffect(() => {
   
  setTimeout(() => {
    setError(null)
    setSuccess();
  }, 3000);
}, [success,error])

  return (


    

    <div     style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      justifyContent: "center",
    }}
    className="relative flex flex-col items-center justify-center h-screen w-full bg-gray-100 dark:bg-gray-900"
  ><button onClick={() => navigate('/')} className="absolute top-0 w-[210px] h-[130px] pb-5 p-3 z-10 " > <img  src={logo} alt="Image Description"/></button>
      <h2 onClick={() => toggleFullSceen()} className="text-3xl font-bold tracking-tight text-white pb-5">Cancel QR Code</h2>
     
      <div className= "h-[700px] bg-white  bg-opacity-20 backdrop-filter backdrop-blur-sm text-white  rounded-3xl p-5 mx-4 w-full max-w-md space-y-4 flex flex-col items-center">
    
    
      <div className='flex flex-col h-full justify-center items-center'>

    
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center  w-full items-center ">
          {error && <p className="text-red-500  text-lg font-bold ">{error}</p>}
        {success && <p className="text-green-500 font-bold">QR code canceled successfully!</p>}
            <Input
              className="flex-1 rounded-md border border-gray-300 bg-white px-6 py-3  text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-gray-600 dark:focus:ring-gray-600"
              placeholder="Enter QR code ID"
              type="text"
              value={uniqueCode}
              onChange={(e) => setUniqueCode(e.target.value)}
            />
            <Button type="submit" className="rounded-md bg-red-500 px-4 py-2 mt-5 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600">
              Submit
            </Button>
          </div>
        </form>

      
         
     
      </div>
       
          {/* <Button onClick={() => {
          navigate('/')
        }} className="rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600">
   HOME </Button> */}

          
         
      </div>
    
    </div>


  )
}