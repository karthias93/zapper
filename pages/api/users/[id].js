import { apiHandler, omit } from "../../../utils/helpers/api";
import { connectToDatabase } from "/lib/mongoose/mongoDB";
import { ObjectId } from "mongodb";

const getUserByID = async (req, res) => {
    const { db } = await connectToDatabase();

    const { id } = req.query;

    const response = await db.collection("users").findOne({wallet: id});
    return res.status(200).json(response);
};

const updateUser = async (req, res) => {
    const { db } = await connectToDatabase();
    const { ...user } = req.body;
    const { id } = req.query;
    const table = "users";
    const updated = await db.collection(table).updateOne({ wallet: id }, { $set:user });
    if (!updated) throw `Something went wrong!!`;
    const response = await db.collection(table).findOne({ wallet: id });
    return res.status(200).json(response);
};

export default apiHandler({
    get: getUserByID,
    patch: updateUser
});
