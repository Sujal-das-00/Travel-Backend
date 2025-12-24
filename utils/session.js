import session from "express-session";

app.use(
    session({
        name: "admin-session",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // true only if HTTPS
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);
