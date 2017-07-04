import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';
import { _ } from 'meteor/underscore';



Meteor.methods({
    sairChat(params) {
        Chats.update(params.chatId, { $pull: { userIds: params.usrName } });
    },
    entrarChat(params) {
        Chats.update(params.chatId, { $addToSet: { userIds: params.usrName } });
    },
    newMessage(message) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
        }
        check(message, {
            type: String,
            text: String,
            chatId: String
        });
        message.timestamp = new Date();
        message.userId = this.userId;
        message.user = Meteor.user();
        const messageId = Messages.insert(message);
        Chats.update(message.chatId, { $set: { lastMessage: message } });
        return messageId;
    },

    updateName(name, fone) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged in to update his name.');
        }
        check(name, String);
        if (name.length === 0) {
            throw Meteor.Error('name-required', 'Must provide a user name');
        }

        return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
    },
    newChat(otherId, chatnome) {
        console.log('Chats');
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged to create a chat.');
        }
        check(otherId, String);
        const otherUser = Meteor.users.findOne(otherId);
        if (!otherUser) {
            throw new Meteor.Error('user-not-exists', 'Chat\'s user not exists');
        }
        const chat = {
            name: chatnome,
            user: Meteor.user(),
            userIds: [],
            createdAt: new Date()
        };
        const chatId = Chats.insert(chat);


        return chatId;
    },
    removeChat(chatId) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in', 'Must be logged to remove a chat.');
        }
        check(chatId, String);
        const chat = Chats.findOne(chatId);
        if (!chat || !_.include(chat.userIds, this.userId)) {
            throw new Meteor.Error('chat-not-exists', 'Chat not exists');
        }
        Messages.remove({ chatId: chatId });
        return Chats.remove({ _id: chatId });

    }
});