import mongoose from "mongoose";

function setupMongo(): void {
  const mongoDB = "mongodb://localhost:27018/clearwords";


  mongoose.connect(mongoDB, { useNewUrlParser: true });

  //Get the default connection
  var db = mongoose.connection;

  db.on("open", () => { console.log("Mongo connection successfully") })

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

export default setupMongo;