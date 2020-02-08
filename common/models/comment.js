'use strict';

module.exports = function (Comment) {
  Comment.disableRemoteMethodByName('prototype.patchAttributes');
};
