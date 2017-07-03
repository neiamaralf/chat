import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class LoginCtrl extends Controller {
    login() {
        this.$ionicLoading.show({
            template: 'Verificando login...'
        });
        Meteor.loginWithPassword(this.email, this.senha, (err) => {
            this.$ionicLoading.hide();
            if (err) return this.handleError(err);
            this.$state.go('tab.chats', { nome: Meteor.user() });
        });
    }

    registrar() {
        this.$state.go('confirmation', { nome: Meteor.user() });
    }


    handleError(err) {
        this.$log.error('Login error ', err);
        this.$ionicPopup.alert({
            title: err.reason || 'Login failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}

LoginCtrl.$name = 'LoginCtrl';

LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];