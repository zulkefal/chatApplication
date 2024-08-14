const { Conversation } = require("../models/conversationModel");
const { Message } = require("../models/messageModel");

const sendMessage =async (req, res) => {
    try {
        // const senderId = req.id;
        // const receiverId = req.params.id;
         const senderId = '66bcf8fd0219a929c080cdeb';
        const receiverId = '66bc9a3ededef8d7bb4885af';
        const {message} = req.body;
        console.log("sender",senderId);
        console.log("reeiver",receiverId)
        if(!message)
        {
            return res.status(400).json({message:"Message is required"});
        }

        let gotConversation = await Conversation.findOne({participants:{$all:[senderId,receiverId]}});
        if(!gotConversation)
        {
            gotConversation = await Conversation.create({
                participants:[senderId,receiverId],
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if(newMessage)
        {
            gotConversation.messages.push(newMessage._id);
            await gotConversation.save();
            return res.status(200).json({message:"Message Sent Successfully"});
        } 
    } catch (error) {
        console.log("errrp",error);
    }
}

module.exports = {sendMessage};