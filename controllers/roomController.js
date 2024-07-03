const Rooms = require("../models/roomModel");
const RoomUsers = require("../models/roomUserModel");
const Accounts = require("../models/authModel");
const cron = require("node-cron");

const createNewRoom = async (req, res) => {
    // Take details from req body
    const newRoom = req.body;
    // Add to DB (room created)
    const createdRoom = await Rooms.create(newRoom);
    return res.status(200).json(createdRoom);
};

const joinRoom = async (req, res) => {
    // Take details from req body
    const joinExRoom = req.body;

    // Check if the room exists
    const checkRoom = await Rooms.findOne({
        RoomID: joinExRoom.RoomID
    });
    // If doesn't exist, invalid room
    if (!checkRoom) {
        return res.status(401).json({
            message: "invalid room"
        });
    };
    // Add to DB (room joined)
    const joinedRoom = await RoomUsers.create(joinExRoom);
    return res.status(200).json(joinedRoom);

};

const retreiveUsersInRoom = async (req, res) => {
    const { roomID } = req.body;

    const owner = await Room.findOne({ roomID });
    const ownerName = await Account.findOne({
        UserID: owner.OwnerID
    });
    // return res.status(200).json(ownerName);
    // define refresh rate of cron to be every 2 seconds
    cron.schedule('*2 * * * * *', async () => {
        const everyoneID = await RoomUsers.find({
            roomID
        });
    });
    const everyoneUserName = await Account.find({
        UserID: everyoneID.UserID
    });
    if (everyoneUserName) {
        const combinedName = {
            first: ownerName,
            second: everyoneUserName
        }
    };
    if (!everyoneUserName) {
        const combinedName = {
            first: ownerName,
            second: {}
        }
    };

    return res.status(200).json(combinedName)
};

module.exports = {
    createNewRoom,
    joinRoom,
    retreiveUsersInRoom
}