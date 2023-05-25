//added 3 lines to timerProcess.js

//added super crazy functionality

//removed 1 bug

//added this line to see how a merge woul look like in history without --no--ff flag

/**
 * 1. george-silviu starts to work on the feature.
 * It advances but will need to pull from silviu-axiobit repo to finish his work.
 */

/**
 * 2. Silviu-axiobit made some changes.
 * George-silviu will need this changes to build, on them.
 *
 */

/**
 * 3. Now george-silviu can finnish the feature, and it finishes it.
 */
const { insertClosedNotClaimedEvent } = require("./createTicketDAL");
const { app } = require("../../../../index");
// const httpServer = require("http").createServer(app);
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });
const ticketId = process.argv[2];

// getting the countdown time from db (harcoded for test purpose now)
const dbDispacherReactionTime = 1; //1 minute

console.log(
  `A new process instace has been spawned for ticket ${ticketId} an it will run ${dbDispacherReactionTime} minutes.`
);

//calculate the time in miliseconds until the process instance will stop
const timeout = dbDispacherReactionTime * 60 * 1000;

//this is triggered at the end of the countdown if no 'Claim' event will occur
const timeoutId = setTimeout(() => {
  console.log(`Process finished for ticket ${ticketId}.`);

  // const insertEvent = async (ticketId) => {
  //   await insertClosedNotClaimedEvent(ticketId);
  // };

  //insert 'Closed - not claimed' event
  //insertEvent(ticketId);

  //stop the process
  process.exit(0);
}, timeout);

//listen for 'stop' message that will be sent when a user triggers the 'claim' for a ticket
process.on("message", (message) => {
  //if the message sent is 'stop'
  if (message === "stop") {
    //stop the timeout countdown
    clearTimeout(timeoutId);

    //send a message to the instance listener
    process.send("stopped");

    console.log(
      "Timer stopped and process it's finished. Continue with 'Claim' event insertion."
    );
    //stop the process
    process.exit(0);
  }
});

//localCount will store the timeout in seconds, for console display
let localCount = timeout / 1000;

//setting a timer to run at each second and display the time in seconds that remains until process will stop
const intervalId = setInterval(() => {
  localCount = localCount - 1;
  console.log(`Countdown for ticket ${ticketId} : ${localCount}.`);
}, 1000);

///////////////////////////////////////

//set up a socket connection do display the countdown in client UI
//when

// let interval;

// io.on("connection", (socket) => {
//   //log when new client connects to the socket
//   console.log("New client connected.");

//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => {
//     const remainingTime = localCount;

//     // Emitting a new message. Will be consumed by the client
//     socket.emit("remainingTime", { ticketId, remainingTime });
//   }, 1000);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });
