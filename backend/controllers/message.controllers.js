import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, recieverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            });
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage);
            await Promise.all([conversation.save(), newMessage.save()]);

        }

        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);

    } catch (error) {
        console.log(`Internal server error: ${error.message}`);
        res.status(500).json({
            error: "Internal server error!"
        });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: usertoChatID } = req.params;
        const defaultLimit = process.env.VITE_MESSAGES_LIMIT || 50;
        const { limit = defaultLimit, skip = 0 } = req.query;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, usertoChatID]
            },
        }).populate({
            path: "messages",
            options: {
                sort: { createdAt: -1 },
                limit: parseInt(limit),
                skip: parseInt(skip)
            }
        });

        const totalMessages = conversation?.messages.length || 0;
        const allMessagesCount = await Message.countDocuments({
            $or: [
                { senderId, recieverId: usertoChatID },
                { senderId: usertoChatID, recieverId: senderId }
            ]
        });

        return res.status(200).json({
            messages: (conversation?.messages || []).reverse(),
            totalMessages: allMessagesCount,
            hasMore: parseInt(skip) + parseInt(limit) < allMessagesCount
        })

    } catch (error) {
        console.log(`Internal server error: ${error.message}`);
        res.status(500).json({
            error: "Internal server error!"
        });
    }
}