// require('dotenv').config();

// const express = require('express'); 
// const app = express();
// const userModel = require('./models/user'); 
// const movieModel = require('./models/movie');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const path = require('path');
// const crypto = require('crypto');

// app.use(cookieParser());

// app.set('view engine', 'ejs');
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.set('views', path.join(__dirname, 'views'));


// app.get("/", (req, res) => {
//     res.render("index", { message: "" });
// });

// app.get("/login", (req, res) => {
//     res.render("login", { message: "" });
// });

// app.post("/register", async(req, res) => {
//     let {username, name, age, email, password} = req.body;
//     let user =  await userModel.findOne({email});
//     if(user) return res.status(500).render("login", {message:"User already exists"});

//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(password, salt, async (err, hash) => {
            
//             let user = await userModel.create({
//                 username, 
//                 name, 
//                 age, 
//                 email, 
//                 password: hash})

//         let token = jwt.sign({email: email, userid: user._id}, "secret");
//         res.cookie("token", token);
//         res.render("login", { message: "Registration successful! Please log in." });


//         });
//     });  
// });

// app.post("/login", async(req, res) => {
//     let {email, password} = req.body;

//     let user =  await userModel.findOne({email});
//     if(!user) return res.status(500).render("index", {message:"User doesn't exist"} );
    
//     bcrypt.compare(password, user.password, (err, result) => {

//         if(result){
            
//             let token = jwt.sign({email: email, userid: user._id}, "secret");
//             res.cookie("token", token);
//             res.status(200).redirect("/profile");

//         }
//         else res.status(401).render("login", { message: "Incorrect password" });
//     })
// });

// app.get("/logout", (req, res) => {
//     res.cookie("token", "");
//     res.redirect("/login");
// });

// app.get("/profile", isLoggedIn, async(req, res) => {
//     let user = await userModel.findOne({email: req.user.email});
//     await user.populate("movies");
//     res.render("profile", {user});
// });

// app.post('/movie', isLoggedIn, async (req, res) => {
//   let user = await userModel.findOne({ email: req.user.email });
//   const { title, url, director, genre, year, notes } = req.body;

//   let movie = await movieModel.create({
//     user: user._id,
//     title,
//     url,
//     director,
//     genre,
//     year,
//     notes,
//   });

//   user.movies.push(movie._id);
//   await user.save();
//   res.redirect('/profile');
// });

// app.get("/edit/:id", isLoggedIn, async(req, res) => {
//     let movie = await movieModel.findById(req.params.id).populate("user"); 
//     if (!movie) return res.redirect('/profile');
    
//     res.render("edit", {movie})
// });

// app.post("/update/:id", isLoggedIn, async(req, res) => {
//     const { title,url, director, genre, year, notes } = req.body;
//   await movieModel.findByIdAndUpdate(req.params.id, {
//     title,
//     url,
//     director,
//     genre,
//     year,
//     notes,
//   });
//   res.redirect('/profile');
// });

// app.get('/delete/:id', isLoggedIn, async (req, res) => {
//   let movie = await movieModel.findById(req.params.id).populate('user');
//   if (!movie) return res.redirect('/profile');

//   await userModel.findByIdAndUpdate(movie.user.toString(), { $pull: { movies: movie._id } });
//   await movieModel.findByIdAndDelete(movie._id);

//   res.redirect('/profile');
// });


// function isLoggedIn(req, res, next) {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.redirect("/login");
//     }

//     try {
//         const data = jwt.verify(token, "secret");
//         req.user = data;
//         next();
//     } catch (err) {
//         return res.redirect("/login");
//     }

// }  

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

require('dotenv').config();

const express = require('express'); 
const mongoose = require('mongoose');
const app = express();
const userModel = require('./models/user'); 
const movieModel = require('./models/movie');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const crypto = require('crypto');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
});

app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res) => {
    res.render("index", { message: "" });
});

app.get("/login", (req, res) => {
    res.render("login", { message: "" });
});

app.post("/register", async(req, res) => {
    let {username, name, age, email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).render("login", {message:"User already exists"});

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return res.status(500).render("login", {message: "Error generating salt"});
        bcrypt.hash(password, salt, async (err, hash) => {
            if(err) return res.status(500).render("login", {message: "Error hashing password"});

            let user = await userModel.create({
                username, 
                name, 
                age, 
                email, 
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id}, process.env.SECRET);
            res.cookie("token", token);
            res.render("login", { message: "Registration successful! Please log in." });
        });
    });  
});

app.post("/login", async(req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).render("index", {message:"User doesn't exist"} );
    
    bcrypt.compare(password, user.password, (err, result) => {
        if(err) return res.status(500).render("login", { message: "Error comparing passwords" });

        if(result){
            // Use secret from env here:
            let token = jwt.sign({email: email, userid: user._id}, process.env.SECRET);
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }
        else res.status(401).render("login", { message: "Incorrect password" });
    })
});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
});

app.get("/profile", isLoggedIn, async(req, res) => {
    let user = await userModel.findOne({email: req.user.email});
    await user.populate("movies");
    res.render("profile", {user});
});

app.post('/movie', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    const { title, url, director, genre, year, notes } = req.body;

    let movie = await movieModel.create({
        user: user._id,
        title,
        url,
        director,
        genre,
        year,
        notes,
    });

    user.movies.push(movie._id);
    await user.save();
    res.redirect('/profile');
});

app.get("/edit/:id", isLoggedIn, async(req, res) => {
    let movie = await movieModel.findById(req.params.id).populate("user"); 
    if (!movie) return res.redirect('/profile');
    res.render("edit", {movie});
});

app.post("/update/:id", isLoggedIn, async(req, res) => {
    const { title, url, director, genre, year, notes } = req.body;
    await movieModel.findByIdAndUpdate(req.params.id, {
        title,
        url,
        director,
        genre,
        year,
        notes,
    });
    res.redirect('/profile');
});

app.get('/delete/:id', isLoggedIn, async (req, res) => {
    let movie = await movieModel.findById(req.params.id).populate('user');
    if (!movie) return res.redirect('/profile');

    await userModel.findByIdAndUpdate(movie.user.toString(), { $pull: { movies: movie._id } });
    await movieModel.findByIdAndDelete(movie._id);

    res.redirect('/profile');
});

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.redirect("/login");
    }
}  

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
