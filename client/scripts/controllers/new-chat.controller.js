import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class NewChatCtrl extends Controller {
    constructor() {
        super(...arguments);

        this.helpers({
            users() {
                return Meteor.users.find({ _id: { $ne: this.currentUserId } });
            }
        });
    }

    newChat() {
        console.log(Meteor.user());
        this.callMethod('newChat', Meteor.user()._id, this.chatnome, (err, chatId) => {
            this.hideNewChatModal();
            if (err) return this.handleError(err);
            this.goToChat(chatId);
        });
    }

    hideNewChatModal() {
        this.$state.go('tab.chats');
    }

    goToChat(chatId) {
        this.$state.go('tab.chat', { chatId });
    }

    handleError(err) {
        this.$log.error('New chat creation error ', err);

        this.$ionicPopup.alert({
            title: err.reason || 'New chat creation failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}

NewChatCtrl.$name = 'NewChatCtrl';
NewChatCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];