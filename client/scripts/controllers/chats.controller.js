import Moment from 'moment';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';
import NewChat from '../services/new-chat.service';

export default class ChatsCtrl extends Controller {
    constructor() {
        super(...arguments);
        this.nome = this.$state.params.nome;
        this.helpers({
            data() {
                return Chats.find();
            }
        });
    }

    showNewChatModal() {
        this.$state.go('new-chat');
        // this.NewChat.showModal();
    }

    remove(chat) {
        const confirmPopup = this.$ionicPopup.confirm({
            title: 'Tem certeza que deseja excluir a sala?',
            cssClass: 'text-center',
            okText: 'Sim',
            okType: 'button-positive button-clear',
            cancelText: 'Cancelar',
            cancelType: 'button-dark button-clear'
        });
        confirmPopup.then((res) => {
            if (!res) return;
            this.callMethod('removeChat', chat._id);
        });
    }
}



ChatsCtrl.$name = 'ChatsCtrl';

ChatsCtrl.$inject = ['$state', '$ionicPopup', '$log'];