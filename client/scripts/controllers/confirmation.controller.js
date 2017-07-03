import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';


export default class ConfirmationCtrl extends Controller {
    constructor() {
        super(...arguments);
    }

    confirm() {
        Accounts.createUser({
            username: this.nome,
            email: this.email,
            password: this.password
        }, (err) => {
            if (err) return this.handleError(err);
            this.$state.go('tab.chats', { nome: this.nome })
        });

    }

    handleError(err) {
        this.$log.error('Confirmation error ', err);
        this.$ionicPopup.alert({
            title: err.reason || 'Confirmation failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}

ConfirmationCtrl.$name = 'ConfirmationCtrl';
ConfirmationCtrl.$inject = ['$state', '$ionicPopup', '$log'];