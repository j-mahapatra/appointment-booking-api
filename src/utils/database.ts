import mongoose from 'mongoose';

function connectToDb(URI: string) {
  mongoose
    .connect(URI)
    .then((conn) => {
      console.log(`MongoDB connected : ${conn.connection.host}`);
    })
    .catch((error) => {
      console.log(`ERROR: ${error.message}`);
    });
}

export default connectToDb;
