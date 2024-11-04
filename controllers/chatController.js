const { Chat } = require('../Model')
module.exports.userChat = async (req, res) => {
    const { userId } = req.query;
    console.log(req.query);
    if (!userId) {
        res.status(400).json({
            message: "userId is required"
        })
    }

    let chat = await Chat.find({
        isGroupChat: false,
        $and: [{ users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate('users', '-password')
        .populate('latestMessage');

    // chat = await User.populate(chat, {
    //     path: "latestMessage.sender",
    //     select: "name pic email",
    //   });

    if (chat.length > 0) {
        res.send(chat[0])
    } else {
        console.log("your id-"+req.user._id+"others Id"+userId);
        let chatData = {
            chatName: 'Sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createChat._id }).populate('users', '-password');
            // res.status(200).json(fullChat);
            return res.status(200).json({ message: "chat page", redirectUrl: '/chat/chatbox' });

        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }


}

module.exports.chatBox = async (req,res)=>{
    res.render('chatPage');
}



module.exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: [userId] } } })
            .populate('users', '-password')
            .populate('latestMessage')
            .sort({ 'updatedAt': -1 });

        return res.status(200).josn(chats);

    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
}

module.exports.chatPage= async(req,res)=>{
    const userData = JSON.parse(decodeURIComponent(req.query.data));
    console.log(userData);

    res.render('chatPage',{userData});


}