const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connectToDatabase = async ()=>{
    try {
        const connection = await client.connect()
        return connection.db(process.env.DATABASE_NAME);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectToDatabase;