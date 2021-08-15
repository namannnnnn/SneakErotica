import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://np_0210:1234@cluster0.nkzqb.mongodb.net/ShopHere?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(
      `Mongo Database connected : ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error : ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
