'use strict';

module.exports = function (Users) {
  // hide apis that are not required
  Users.disableRemoteMethodByName('create');
  Users.disableRemoteMethodByName('replaceById');
  Users.disableRemoteMethodByName('deleteById');
  Users.disableRemoteMethodByName('changePassword');
  Users.disableRemoteMethodByName('confirm');
  Users.disableRemoteMethodByName('prototype.verify');
  Users.disableRemoteMethodByName('resetPassword');
  Users.disableRemoteMethodByName('setPassword');
  Users.disableRemoteMethodByName('prototype.__get__posts__users');
};
