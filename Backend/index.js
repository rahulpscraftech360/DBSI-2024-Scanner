const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");


const server = require("http").createServer(app);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// Use middleware to parse JSON bodies
app.use(express.json());

const corsOptions = {
  origin: [
    "https://dbsi-3ce7f.web.app/",
    "https://fir-deploy-98038.web.app",
    "https://fir-deploy-98038.firebaseapp.com",
    "http://localhost:5000",
  ], // Replace "*" with the appropriate origin or origins of your frontend application
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));
// const io = require("socket.io")(server, {
//   cors: {
//     origin: [
//       "https://fir-deploy-98038.web.app",
//       "https://fir-deploy-98038.firebaseapp.com",
//       "http://localhost:5173",
//     ], // Replace "*" with the appropriate origin or origins of your frontend application
//     methods: ["GET", "POST"],
//   },
// });

const PORT = 3000;

// const mongo_URI =
//   "mongodb+srv://yamuna:Dbnd0ki7s3DC0DQ3@cluster0.v6kew10.mongodb.net/hammer-users";

const mongo_URI =
  "mongodb+srv://rahul:Vjvhtnn5YpAW2HOg@cluster0.qgbcq7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongo_URI)
  .then((result) => {
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.error("Error connecting to the MongoDB database:", error);
  });

  

// app.post('/api/getUser', async (req, res) => {
//     console.log(req.body)
//     try {
//       const { uniqueCode } = req.body;
  
//       const user = await User.findOne({ uniqueCode });
//        console.log(user)
//       if (user.isAttended == false) {

//         await User.updateOne({ uniqueCode }, { $set: { isAttended: true } });
//         console.log("sucess", user)
//         res.status(200).json({ success: true, user });
//       } else {
//         console.log(" ,",user)
//         res.status(200).json({ success: true, user });
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });
  
  app.post('/api/getUser', async (req, res) => {
    console.log(req.body); // This should log the request body
    try {
      const { uniqueCode } = req.body;
  console.log(uniqueCode)
      const user = await User.findOne({ uniqueCode });
      console.log(user)

      if (!user || user.invalidQR) {
        console.log("User not found");
        return res.status(200).json({ success: false, message: 'Invalid QR' });
      }
  
      if (user.isAttended === false) {
        await User.updateOne({ uniqueCode }, { $set: { isAttended: true } });
        console.log("Success", user);
        res.status(200).json({ success: true, user });
      } else {
        console.log("Invalid", user);
        res.status(200).json({ success: true, user });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});




  //User count function
//   socket.on("getUserCount", (e) => {
//     console.log(e);
//     async function asyncCall() {
//       const user = await User.findOne({ uniqueCode: e });
//       console.log(user);
//       if (user && user.count < 4) {
//         let previousCount = user.count;
//         await User.updateOne(
//           { uniqueCode: e },
//           { $set: { count: previousCount + 1 } }
//         );
//         const presentCount = previousCount + 1;
//         socket.emit("showCount", presentCount);
//       } else {
//         socket.emit("over");
//       }
//     }
//     asyncCall();
//   });


//get drink count



// app.post('/api/getDrinkCount', async (req, res) => {
//     try {
//       const { uniqueCode } = req.body;
  
//       const user = await User.findOne({ uniqueCode });
  
//       if (user && user.count < 4) {
//         const previousCount = user.count;
//         await User.updateOne({ uniqueCode }, { $set: { count: previousCount + 1 } });
//         const presentCount = previousCount + 1;
//         res.status(200).json({ success: true, count: presentCount });
//       } else {
//         res.status(200).json({ success: false, message: 'User count exceeded' });
//       }
//     } catch (error) {
//       console.error('Error fetching user count:', error);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     }
//   });



app.post('/api/getDrinkCount', async (req, res) => {
    try {
      const { uniqueCode } = req.body;
      const user = await User.findOne({ uniqueCode });
  
      if (user && !user.invalidQR) {
        const previousCount = user.count; //initaly its zero
        var newCount;
        if(previousCount===4){
          newCount=user.count
        }else{
          newCount=user.count+1
        }
      
        const remainingCount = 4- previousCount; //total four
  
        if (remainingCount >= 0) {
          await User.updateOne({ uniqueCode }, { $set: { count: newCount } });
          res.status(200).json({ success: true, remainingCount, message: `You have ${remainingCount} drinks remaining.` });
        } else {
          res.status(200).json({ success: false, message: 'You have reached the maximum drink limit.' });
        }
      } else {
        res.status(200).json({ success: false, message: 'Invalid QR ' });
      }
    } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


  
  app.post('/api/cancelQR', async (req, res) => {
    console.log(req.body); // This should log the request body
    try {
      const { uniqueCode } = req.body;
  console.log(uniqueCode)
      const user = await User.findOne({ uniqueCode });
      console.log(user)

      if (!user || user.invalidQR) {
        console.log("User not found");
        return res.status(200).json({ success: false, message: 'Invalid QR' });
      }
  
     
        await User.updateOne({ uniqueCode }, { $set: { invalidQR: true } });
        console.log("Success", user);
        res.status(200).json({ success: true, user });
      
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });