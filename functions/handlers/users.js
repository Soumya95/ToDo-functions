const { admin } = require("../util/admin");

// Log user in
exports.login = (req, res) => {
    const user = {
        email: req.body.email
    };

    admin
        .auth()
        .getUserByEmail(user.email)
        .then((data) => {
            return res.json({ data });
        })
        .catch((err) => {
            console.error(err);
            // auth/wrong-password
            // auth/user-not-user
            return res
                .status(403)
                .json({ general: "Wrong credentials, please try again" });
        });
};