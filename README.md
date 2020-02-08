## UserManagement

The project is generated by [LoopBack](http://loopback.io).

## Dependencies

- node >=6
- Loopback 3.X
- MongoDB 4.2.x Enterprise

## Steps to run the application

1. Clone the repo and navigate to inside it.
2. Install all dependencies by running command `npm install`.
3. Add Users, Posts, Comments and Role mapping to database by running command `node bin/automigrate.js`. This command will setup database with default data to run the application.
4. Start the server by running command `npm start`..
5. Open browser and navigate to [http://localhost:3000/explorer](http://localhost:3000/explorer)
6. There will be list of all APIs, navigate to `users` section and login to application by using url `/users/login`. Details for login api can be found below.
7. Use the access token obtained from login API for validating protected API. Copy access token and paste it to access token input located at top right (header).

## Available APIs

#### Login

**url:** `/users/login`
**Method:** `POST`
**Description:** Authentication user to get access token
**request body:**
For Admin

```javascript
{
  "username": "Bret",
  "password": "test@123"
}
```

For normal user (username can be any value user present)

```javascript
{
  "username": "Antonette",
  "password": "test@123"
}
```

#### Logout

**url:** `/users/logout`
**Method:** `POST`
**Description:** Logout user

#### View loggedin user details

**url:** `/users/{<user_id>}`
**Method:** `GET`
**Description:** Admin can fetch all user by Id and for normal user (authenticated) they are allowed to see their details only.

#### View all users (For admin)

**url:** `/users`
**Method:** `GET`
**Description:** Fetch all users (For Admins only).

#### Upload image

**url:** `/users/{<user_id>}`
**Method:** `PATCH`
**Description:** Admin can update all user by Id and for normal user (authenticated) they are allowed to update their details only.
**request body:**

```javascript
{
  "profilePIc": "<Base64 image>",
  "name": "updatedName"
}
```

#### View Post by user

**url:** `/users/{<user_id>}/posts`
**Method:** `GET`
**Description:** Fetch posts by user, Admin can fetch posts for all users.

### View all Posts (For admin)

**url:** `/posts`
**Method:** `GET`
**Description:** Fetch all posts (For Admin only).
