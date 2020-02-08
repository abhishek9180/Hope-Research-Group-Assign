'use strict';

module.exports = function (Post) {
  Post.disableRemoteMethodByName('prototype.patchAttributes');
  Post.disableRemoteMethodByName('prototype.__get__users__posts');
};
