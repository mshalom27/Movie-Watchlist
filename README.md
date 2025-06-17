# 🎬 Movie Watchlist

Welcome to **Movie Watchlist**!  
A full-stack web application to keep track of your favorite movies. 
Built using **Node.js**, **Express.js**, **EJS**, and **MongoDB**, 
this app lets users sign up, log in, add movies to a personalized watchlist, and manage them easily.

---

## ✨ Features

- User authentication (SignUp / LogIn / Log Out)
- Passwords hashed securely
- Add movies to your watchlist
- Update or Delete movies from your list
- LogIn to View your profile and current list
- EJS templating for dynamic views
- Built with clean MVC architecture
- MongoDB Atlas for remote database- 

---

## 🤩 How to Use

1. **Sign Up**: Create your account.
2. **Log In**: Access your personal watchlist.
3. **Add Movies**: Click "Add Movie" and fill out the details.
4. **Manage Your List**: Edit or Delete movies as you watch them.
5. **View Profile**: See your current watchlist and update your info.

---

## 🛠️ Tech Stack

- **Frontend:** EJS templating, HTML5, TailwindCSS or plain CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** Express-Session + bcrypt
- **Deployment:** Render / Vercel / Railway (optional)
  
---

## 🗂️ Folder Structure

Movie-Watchlist/
│
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
├── node_modules/
├── models/
│   ├── movie.js
│   └── user.js
└── views/
    ├── edit.ejs
    ├── index.ejs
    ├── login.ejs
    └── profile.ejs

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended) 
- npm 
- MongoDB database (local or cloud) 

### Installation

1. **Clone the repository**  
    ```sh
    git clone https://github.com/mshalom27/Movie-Watchlist.git
    cd Movie-Watchlist
    ```

2. **Install dependencies**  
    ```sh
    npm install
    ```

3. **Configure environment variables**  
    Create a `.env` file in the root directory and add:
    ```
    MONGODB_URI=your_mongodb_connection_string
    SESSION_SECRET=your_secret_key
    ```

4. **Start the app!**  
    ```sh
    node app.js
    ```
    Or for auto-reloading during development:
    ```sh
    npx nodemon app.js
    ```

5. **Open your browser** and go to [http://localhost:3000](http://localhost:3000) 🌐

---

## 🔒 Environment Variables

The following variables are required:

- MONGO_URI	        --     MongoDB Atlas connection URI
- SESSION_SECRET	  --     Session encryption key

---

## 📌 Important Scripts

- npm start	    --     Starts the application
- npm run dev	  --    Runs app with nodemon

---

## 🤝 Contributing

Want to make Movie Watchlist even better?  
Contributions are welcome! Feel free to open issues or submit PRs.

- Fork the repo
- Create a new branch (git checkout -b feature-xyz)
- Commit changes (git commit -m "Add feature xyz")
- Push to branch (git push origin feature-xyz)
- Create a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

[mshalom27](https://github.com/mshalom27)
Made with 💜 by **Shalom**


## 🎉 Have fun and happy movie watching!
