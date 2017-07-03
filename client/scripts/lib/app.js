// Libs

import 'angular-animate';

import 'angular-meteor';
import 'angular-moment';
import 'angular-sanitize';

import 'angular-ui-router';
import 'angular-meteor-auth';
import 'ionic-scripts';

import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader';

import { Meteor } from 'meteor/meteor';



// Modules
import ChatsCtrl from '../controllers/chats.controller';
import SettingsCtrl from '../controllers/settings.controller';
import CalendarFilter from '../filters/calendar.filter';
import ChatCtrl from '../controllers/chat.controller';
import LoginCtrl from '../controllers/login.controller';
import ProfileCtrl from '../controllers/profile.controller';
import ConfirmationCtrl from '../controllers/confirmation.controller';
import InputDirective from '../directives/input.directive';
import NewChatCtrl from '../controllers/new-chat.controller';

//import Routes from '../routes';
import Routes from '../routes';

const App = 'Whatsapp';
// App

Angular.module(App, [

    'angular-meteor',
    'angular-meteor.auth',
    'angularMoment',
    'ionic'

]);


new Loader(App)
    .load(ChatsCtrl)
    .load(CalendarFilter)
    .load(ChatCtrl)
    .load(LoginCtrl)
    .load(InputDirective)
    .load(ConfirmationCtrl)
    .load(Routes)
    .load(SettingsCtrl)
    .load(ProfileCtrl)
    // .load(NewChatService)
    .load(NewChatCtrl);
// Startup
//.load(ProfileCtrl)
if (Meteor.isCordova) {

    Angular.element(document).on('deviceready', onReady);

} else {

    Angular.element(document).ready(onReady);

}



function onReady() {

    Angular.bootstrap(document, [App]);

}