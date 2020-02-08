// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-database
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const path = require('path');
const https = require('https');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mongoDB;
let count = 5;
createRole();
getUsers(USERS_URL);
getComments(COMMENTS_URL);
getPosts(POSTS_URL);



function migrateData(model, modelInstance, data) {
  ds.automigrate(model, function (err) {
    if (err) throw err;
    modelInstance.create(data, function (err, model) {
      console.log("Data added successfully: ", model);
      count--;
      if (count === 0) {
        // disconnect datasource
        setTimeout(() => ds.disconnect(), 500);
      }
    })
  });
}

function createRoleMapping(users) {
  const data = users.map((u, index) => {
    const obj = {
      id: index,
      principalType: 'USER',
      principalId: u.id,
      roleId: 2
    };
    // make first user admin
    if (u.id === 1) {
      obj.roleId = 1;
    }
    return obj;
  })
  migrateData('UserRoleMapping', app.models.UserRoleMapping, data);
}

function createRole() {
  const data = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'viewer'
    }
  ]
  migrateData('UserRole', app.models.UserRole, data);
}

// fetch all comments
function getComments(url) {
  https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      data = JSON.parse(data).map(d => {
        const obj = {
          id: d.id,
          postId: d.postId,
          name: d.name,
          email: d.email,
          body: d.body
        }
        return obj;
      });
      migrateData('comment', app.models.comment, data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

// fetch all posts
function getPosts(url) {
  https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      data = JSON.parse(data).map(d => {
        const obj = {
          id: d.id,
          userId: d.userId,
          title: d.title,
          body: d.body
        }
        return obj;
      });
      migrateData('post', app.models.post, data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

// fetch all users
function getUsers(url) {
  https.get(url, (resp) => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      data = JSON.parse(data);
      const body = [];
      data.forEach(u => {
        const obj = {
          id: u.id,
          name: u.name,
          username: u.username,
          email: u.email,
          emailVerified: true,
          password: "test@123",
          profilePic: null
        }
        if (u.id === 1) {
          obj['userLevel'] = 'admin'
        }
        body.push(obj);
      });
      migrateData('users', app.models.users, body);
      // create role mapping for user
      createRoleMapping(data);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
