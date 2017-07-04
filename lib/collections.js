import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
    Meteor.publish('chats', function tasksPublication() {
        return Chats.find();
    });
    Meteor.publish('messages', function tasksPublication() {
        return Messages.find();
    });

}