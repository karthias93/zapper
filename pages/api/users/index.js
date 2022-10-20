import { apiHandler, omit } from "../../../utils/helpers/api";
import { connectToDatabase } from "lib/mongoose/mongoDB";
import { ObjectId } from "mongodb";
const bcrypt = require("bcryptjs");

const getUserByID = async (req, res) => {
    const { db } = await connectToDatabase();
    // return users without hashed passwords in the response

    const { skip = 0 } = req.query;

    const users = await db.collection("users").find().skip(parseInt(skip)).limit(10).toArray();
    const response = users.map((x) => omit(x, "hash"));
    return res.status(200).json(response);
};

const updateUser = async (req, res) => {
    const { db } = await connectToDatabase();
    const { id, oldPassword, newPassword, isMember, ...user } = req.body;
    const table = isMember ? "members" : "users";

    if (oldPassword, newPassword) {
        const userData = await db.collection(table).findOne({ _id: new ObjectId(id) });

        // validate
        if (!(userData && bcrypt.compareSync(oldPassword, userData.hash))) {
            throw "password is incorrect";
        }
        // hash password
        user.hash = bcrypt.hashSync(newPassword, 10);
    }
    const updated = await db.collection(table).updateOne({ _id: new ObjectId(id) }, { $set:user });
    if (!updated) throw `Something went wrong!!`;
    const response = await db.collection(table).findOne({ _id: new ObjectId(id) });
    return res.status(200).json(response);
};

export default apiHandler({
    get: getUserByID,
    patch: updateUser
});
