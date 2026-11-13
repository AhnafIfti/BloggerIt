# BloggerIt: Blog Backend (Node.js + Express + MongoDB)

The **backend API** for a full-stack blogging app, built with **Express 5**, **MongoDB (Mongoose)** and **Passport.js**. It handles user accounts, session login (local and **Google OAuth**), blog posts with tags, search, author subscriptions, and an "active users" list.

> Built in May 2025. This is the backend for the React frontend **[BlogStack](https://github.com/AhnafIfti/BlogStack)**.

---

## Features

- **Authentication**
  - Register, log in and log out with a username and password (Passport Local and bcrypt)
  - **Google login** (Passport Google OAuth 2.0). It links to an existing account if the email matches.
  - Cookie sessions with `express-session`
  - `/check-auth` endpoint that the frontend uses to get the logged-in user
- **Posts**
  - Create, edit, view and delete posts with a title, content and tags
  - Search posts
  - Profile endpoint that returns an author and their posts
  - Ownership check: only the author can open a post's update page or delete the post
- **Subscriptions**: follow or unfollow other authors. Stored in a `Subscription` collection and in each user's `isFollowing` list.
- **Active users**: an in-memory list of users who are logged in right now
- **Validation**: request bodies are checked with **Joi**

---

## Tech Stack

| Part            | Technology                                          |
|-----------------|-----------------------------------------------------|
| Runtime         | Node.js                                             |
| Framework       | Express 5                                           |
| Database        | MongoDB with Mongoose 8                             |
| Auth            | Passport (Local and Google OAuth 2.0), express-session, bcrypt |
| Validation      | Joi                                                 |
| Other           | CORS, dotenv, method-override, express-flash        |
| Views (legacy)  | Pug templates from an earlier server-rendered version |
| Dev             | nodemon                                             |

---

## Project Structure

```
BloggerIt/
├── index.js                 # App setup: middleware, sessions, Passport strategies, routes
├── models/
│   ├── db.js                # MongoDB connection
│   ├── User.js
│   ├── Post.js
│   └── Subscription.js
├── controllers/
│   ├── auth.js              # Login, logout, check-auth, active users
│   ├── users.js             # Register, user list
│   ├── posts.js             # Post CRUD, search, profile
│   └── subscriptions.js     # Subscribe and unsubscribe
├── routes/                  # authRoutes, userRoutes, postRoutes, subscriptionRoutes, adminRoutes (empty)
├── middleware/              # Joi validators, post ownership check, login check
├── schema/                  # Joi schemas: login, register, post
├── views/                   # Pug templates (older server-rendered UI)
└── public/css/
```

### Data Models

| Model          | Fields                                                                 |
|----------------|------------------------------------------------------------------------|
| `User`         | `fullname`, `email`, `username`, `password` (hashed), `isAdmin`, `googleId`, `profilePicture`, `isFollowing[]`, `createdAt` |
| `Post`         | `title`, `content`, `tags[]`, `createdBy` (links to the User), `createdAt` |
| `Subscription` | `subscriberId`, `targetUserId`                                         |

---

## API Endpoints

### Auth
| Method | Endpoint                 | What it does                     |
|--------|--------------------------|----------------------------------|
| POST   | `/login`                 | Log in (username, password)      |
| GET    | `/logout`                | Log out                          |
| GET    | `/check-auth`            | Get the current logged-in user   |
| GET    | `/active-users`          | List online users                |
| GET    | `/auth/google`           | Start Google login               |
| GET    | `/auth/google/callback`  | Google callback (redirects to the frontend) |

### Users
| Method | Endpoint          | What it does   |
|--------|-------------------|----------------|
| POST   | `/user/register`  | Register       |
| GET    | `/user/list`      | List all users |

### Posts
| Method | Endpoint                    | What it does                    |
|--------|-----------------------------|---------------------------------|
| GET    | `/post`                     | All posts                       |
| GET    | `/post/search?searchField=` | Search posts                    |
| GET    | `/post/:id`                 | One post                        |
| GET    | `/post/profile/:id`         | An author and their posts       |
| POST   | `/post/submit/:id`          | Create a post (`:id` = user ID) |
| PUT    | `/post/edit/:userId/:id`    | Edit a post                     |
| DELETE | `/post/delete/:id`          | Delete a post (owner only)      |

### Subscriptions (login required)
| Method | Endpoint                    | Body               |
|--------|-----------------------------|--------------------|
| POST   | `/subscription/subscribe`   | `{ targetUserId }` |
| POST   | `/subscription/unsubscribe` | `{ targetUserId }` |

---

## Running Locally

### 1. Install
```bash
git clone https://github.com/AhnafIfti/BloggerIt.git
cd BloggerIt
npm install
```

### 2. Create a `.env` file
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog
SECRET_KEY=any-long-random-string
CLIENT_URL=http://localhost:5173

# Only needed for Google login
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_URL=http://localhost:3000/auth/google/callback
```

### 3. Start the server
```bash
npm run dev
```

The API runs at http://localhost:3000. Start the [BlogStack](https://github.com/AhnafIfti/BlogStack) frontend so you have a UI.
