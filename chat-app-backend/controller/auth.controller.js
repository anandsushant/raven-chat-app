import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {

        const { firstName, lastName, username, password, confirmPassword, gender } = req.body;

        // const fullName = firstName + lastName;

        // matching password and confirmPassword
        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords don't match"});
        }

        // finding user with existing username
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists"});
        }

        // hashing password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating profile pic using first name and last name
        const profilePicture = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

        // creating an object for new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            profilePic: profilePicture,
            gender,
        });

        // saving the new user to database
        if (newUser){

            // generate JWT token here  
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.firstName + " " + newUser.lastName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const login = async (req, res) => {

    try {

        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        console.log(user.username);
        console.log(isPasswordCorrect);
        
        if (!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.firstName + " " + user.lastName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }


    // res.send("Login Route");
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}

    // res.send("Logout Route")
};