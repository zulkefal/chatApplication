const { Conversation } = require("../models/conversationModel");
const { Message } = require("../models/messageModel");

const sendMessage =async (req, res) => {
    try {
        const senderID = req.id;
        const receiverID = req.params.id;
        const {message} = req.body;
        if(!message)
        {
            return res.status(400).json({message:"Message is required"});
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

const getMessage = async(req,res)=>{
    try {
        
        const receiverID = req.params.id;
        const senderID = req.id;
        const conversation = await Conversation.findOne({
                participants:{$all:[senderID,receiverID]}
        }).populate("messages");
        console.log(conversation);

    } catch (error) {
        console.log("Error from getMessage",error);
    }
}

module.exports = {sendMessage,getMessage};