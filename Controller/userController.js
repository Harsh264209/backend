const MyUser = require("../Models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Config/Auth");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await MyUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new MyUser({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);

    res
      .status(201)
      .json({ token, userId: newUser._id, username: newUser.name });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const loginUser=async(req,res)=>{

    const {email,password}=req.body

    try {
        const user=await MyUser.findOne({email})

        if(!user){
            return res.status(401).json({error:"email does not exists"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user._id);

    res.json({ token, userId: user._id, user: user.email });
    } 
    catch (error) {
        console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }


}


module.exports = {
    registerUser,
    loginUser,
  };