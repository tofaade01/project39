const mongoose = require('mongoose');


const uri = "mongodb+srv://nugrahatofa:shineofblg02@project39.ufja2.mongodb.net/?retryWrites=true&w=majority&appName=project39";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected successfully');
    } catch (error) {
        console.error('MongoDB disconnection error:', error);
        process.exit(1); // Exit process with failure
    }
}



module.exports = {
    connectDB,
    disconnectDB
};