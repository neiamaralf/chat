import Ionic from 'ionic-scripts';

import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';

export default class ChatCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.chatId = this.$stateParams.chatId;
        this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
        this.isCordova = Meteor.isCordova;
        Chats.update(this.chatId, { $addToSet: { userIds: Meteor.user().username } });
        console.log(Chats.find({ _id: this.chatId }, { userIds: {} }).fetch());
        this.helpers({
            messages() {
                return Messages.find({ chatId: this.chatId });
            },
            usuarios() {
                return Chats.find({ _id: this.chatId }, { userIds: {} });
            },
            data() {
                return Chats.findOne(this.chatId);
            }

        });
        this.autoScroll();
    }

    sair() {
        Chats.update(this.chatId, { $pull: { userIds: Meteor.user().username } });
        this.$state.go('tab.chats');
    }

    sendMessage() {
        if (_.isEmpty(this.message)) return;
        this.callMethod('newMessage', {
            text: this.message,
            type: 'text',
            chatId: this.chatId
        });
        delete this.message;
    }

    inputUp() {
        if (this.isIOS) {
            this.keyboardHeight = 216;
        }
        this.scrollBottom(true);
    }

    inputDown() {
        if (this.isIOS) {
            this.keyboardHeight = 0;
        }
        this.$ionicScrollDelegate.$getByHandle('chatScroll').resize();
    }

    closeKeyboard() {
        if (this.isCordova) {
            cordova.plugins.Keyboard.close();
        }
    }

    autoScroll() {
        let recentMessagesNum = this.messages.length;
        this.autorun(() => {
            const currMessagesNum = this.getCollectionReactively('messages').length;
            const animate = recentMessagesNum != currMessagesNum;
            recentMessagesNum = currMessagesNum;
            this.scrollBottom(animate);
        });
    }

    scrollBottom(animate) {
        this.$timeout(() => {
            this.$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
        }, 300);
    }
}

ChatCtrl.$name = 'ChatCtrl';
ChatCtrl.$inject = ['$state', '$stateParams', '$timeout', '$ionicScrollDelegate'];