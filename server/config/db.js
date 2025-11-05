import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://yahirdegantesalinas_db_user:4UsbBwPVo6mMHbaB@cluster0.jzp4avg.mongodb.net/Users_GraphQL');
        console.log('DB Conectada');
    } catch (error) {
        console.error('Error conectando a DB:', error);
        process.exit(1);
    }
};

export default connectDB;