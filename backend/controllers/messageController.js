const { default: mongoose } = require("mongoose");
const { Conversation } = require("../models/conversationModel");
const { Message } = require("../models/messageModel");
const { getReceiverSocketID, io } = require("../Socket/socket");

const sendMessage =async (req, res) => {
    try {
        const senderID = req.id;
        const receiverID = req.params.id;
        const {message} = req.body;
        const file = req.file;

        if (!message && !file) {
            return res.status(400).json({ message: "Message or file is required" });
          }

        let gotConversation = await Conversation.findOne({participants:{$all:[senderID,receiverID]}});
        if(!gotConversation)
        {
            gotConversation = await Conversation.create({
                participants:[senderID,receiverID],
            });
        }

        const newMessage = await Message.create({
            senderID,
            receiverID,
            message,
            file: file ? file.path : null 
        });

        if(newMessage)
        {
            gotConversation.messages.push(newMessage._id);
        }
        // await gotConversation.save();
        // await newMessage.save();
        await Promise.all([gotConversation.save(),newMessage.save()]);
        const receiverSocketID = getReceiverSocketID(receiverID);
        console.log("receiverSocketID",receiverSocketID)

        if(receiverSocketID)
        {
            io.to(receiverSocketID).emit('newMessage',newMessage);
        }
        return res.status(200).json({newMessage}); 
    } catch (error) {
        console.log("errrp",error);
    }
}

const getMessage = async (req, res) => {
    try {
        const receiverID = req.params.id;
        const senderID = req.id;
        // console.log("senderID in Get Message",senderID);
        // console.log("receiverID in GET Message",receiverID);
        if (!mongoose.Types.ObjectId.isValid(senderID) || !mongoose.Types.ObjectId.isValid(receiverID)) {
            return res.status(400).json({ message: 'Invalid sender or receiver ID' });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] }
        }).populate('messages');

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        res.status(200).json(conversation);
    } catch (error) {
        console.error('Error from getMessage:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {sendMessage,getMessage};