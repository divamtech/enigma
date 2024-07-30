const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400, // 24 hours
  });
}

// Function to map roles to authorities array
async function getAuthorities(user) {
  let authorities = [];
  const roles = await user.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }
  return authorities;
}

// Signup function
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate username and email
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Username, email, and password are required." });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).send({ message: "Username or Email already exists!" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create user
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Assign default role to user
    const defaultRole = await Role.findOne({ where: { name: "user" } });
    await user.setRoles([defaultRole]);

    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send({ message: "An error occurred while registering the user." });
  }
};

// Signin function
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate username and password
    if (!email || !password) {
      return res.status(400).send({ message: "Username and password are required." });
    }

    // Find user by username
    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Get user roles
    const authorities = await getAuthorities(user);

    // Store token in session (if needed)
    req.session.token = token;

    // Send response with user details and token
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      // roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).send({ message: "An error occurred while signing in." });
  }
};

// Signout function
exports.signout = async (req, res) => {
  try {
  
    req.session = null;
    res.status(200).send({ message: "You have been signed out successfully!" });
  } catch (error) {
    console.error("Error in signout:", error);
    res.status(500).send({ message: "An error occurred while signing out." });
  }
};
