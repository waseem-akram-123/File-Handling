const express = require ("express");
const app = express();
const path = require ("path");

const multer = require ("multer");

const storage = multer.diskStorage ({
    destination: function (req,res,cb){
        return cb (null, "./uploads");
    },
    filename: function (req,file,cb){
        return cb (null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer ({storage});

const PORT = 8000;

app.set ("view engine", "ejs");
app.set ("views", path.join (__dirname, "views"));

app.use (express.urlencoded ({extended:false}));

app.get ("/", (req,res)=> {
    return res.render ("home");
});

app.post ("/upload", upload.single("profileImage"), (req,res) => {

    res.redirect ("/");
})

app.listen (PORT, ()=> console.log (`server started at PORT ${PORT}`));