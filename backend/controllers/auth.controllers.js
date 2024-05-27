import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            const isPasswordCorrect = await bcryptjs.compare(password, user.password);
            if (isPasswordCorrect) {
                generateTokenAndSetCookie(user._id, res);
                return res.status(201).json({
                    _id: user._id,
                    fullName: user.fullName,
                    username: user.username,
                    profilePic: user.profilePic
                });
            } else {
                console.log(`Wrong password!`);
                return res.status(400).json({
                    error: "Invalid username or password!"
                });
            }

        } else {
            return res.status(400).json({
                error: "Username does not exist!"
            });
        }

    } catch (error) {
        console.log(`Error in login ${error.message}`);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const signUpUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords don't match",
            });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                error: "Username already exists!"
            });
        }

        const profilePic = `https://avatar.iran.liara.run/username?username=${fullName}&length=1`;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            profilePic,
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            return res.status(400).json({
                error: "Invalid user data"
            });
        }

    } catch (error) {
        console.log(`Error signing up! ${error.message}`);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const logoutUser = (_, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully!"});
    } catch (error) {
        console.log(`Error in logout ${error.message}`);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
