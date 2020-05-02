const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../jokes/model");
const jsonwebtoken = require("jsonwebtoken");

const { tokenSecret } = require("../config/secrets");

router.post("/register", async (req, res) => {
  // implement registration
  const userBody = req.body;
  const hash = bcrypt.hashSync(userBody.password, 10);
  userBody.password = hash;

  const addAuthUser = await Users.addUsers(userBody);
  const token = generateToken(addAuthUser);
  try {
    res.status(201).json({ addAuthUser, token });
  } catch (error) {
    res.status(500).json("Error, please contact the developer of this API");
  }
});

router.post("/login", (req, res) => {
  // implement login

  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      console.log(password);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        // req.session.user = username;
        res.status(200).json({ message: `Welcome ${username}!`, token });
      } else {
        res
          .status(401)
          .json("Looks like you enter the wrong username or password");
      }
    })
    .catch((error) => {
      res.status(500).json("Error, please contact the developer of this API");
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };
  return jsonwebtoken.sign(payload, tokenSecret, options);
}

module.exports = router;
