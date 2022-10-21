import { apiHandler } from "../../../utils/helpers/api";
import { connectToDatabase } from "/lib/mongoose/mongoDB";
import { ObjectId } from "mongodb";

const updateProfilepic = async (req, res) => {
  const { db } = await connectToDatabase();
  const { id, ...file } = req.body;
  const table = "users";
  const updated = await db.collection(table).updateOne({ wallet: id }, { $set: {profilePic: file, wallet: id} }, {upsert: true});
  if (!updated) throw `Something went wrong!!`;
  const response = await db.collection(table).findOne({ wallet: id});
  return res.status(200).json(response);
};

export default apiHandler({
    post: updateProfilepic,
});