const RoomEvents = require("../models/roomEventModel");
const RoomUser = require("../models/roomUser");
const Event = require("../models/eventModel");

// GET endpoint to retrieve a list of all Events
const getVotes = async (req, res) => {
    const {roomID, eventID} = req.body;

    // Query the DB for a list of all tasks
    const verifyRoom = await RoomUser.findOne({
        roomID: roomID
    });

    const verifyEvent = await Event.findOne({
        eventID: eventID
    })

    if(!verifyRoom || !verifyEvent){
        return res.status(400).json({
            message: "Room does not exist!"
        })
    }

    const roomEvent = await RoomEvents.findOne({
        roomID: roomID,
        eventID: eventID
    })
    // Respond to the user
    return res.status(200).json(roomEvent);
};

const addVotes = async (req, res) =>{
    const { roomID, eventID } = req.body;

    // Query the DB for a list of all tasks
    const verifyRoom = await RoomUser.findOne({ roomID: roomID });
    const verifyEvent = await Event.findOne({ eventID: eventID });

    if (!verifyRoom || !verifyEvent) {
        return res.status(400).json({
            message: "Room or Event does not exist!"
        });
    }

    // Find and increment the numOfAgree field
    const roomEvent = await RoomEvents.findOneAndUpdate(
        { roomID: roomID, eventID: eventID },
        { $inc: { numOfAgree: 1 } },  // Increment the numOfAgree field by 1
        { new: true }  // Return the updated document
    );

    if (!roomEvent) {
        return res.status(404).json({
            message: "RoomEvent not found!"
        });
    }

    // Respond to the user
    return res.status(200).json(roomEvent);
};

const getTotalUserInEvent = async (req, res) => {
    const {roomID} = req.body;

    try {
        // Check if roomID exists in RoomUser collection
        const verifyRoom = await RoomUser.findOne({ roomID: roomID });

        if (!verifyRoom) {
            return res.status(404).json({
                message: "Room does not exist!"
            });
        }

        // Count the number of documents with the same roomID
        const roomUserCount = await RoomUser.countDocuments({ roomID: roomID });

        // Add one to the count
        const totalUsers = roomUserCount + 1;

        // Respond to the user with the total number of users
        return res.status(200).json({ totalUsers: totalUsers });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while processing your request."
        });
    }
}

const getAllEvent = async (req,res) => {
    const { roomID } = req.body;

    try {
        // Check if roomID exists in RoomEvent collection
        const events = await RoomEvents.find({ roomID: roomID });

        if (events.length === 0) {
            return res.status(404).json({
                message: "No events found for the specified room."
            });
        }

        // Respond to the user with the list of events
        return res.status(200).json(events);
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while processing your request."
        });
    }
};

module.exports = {
    addVotes,
    getVotes,
    getTotalUserInEvent,
    getAllEvent
}