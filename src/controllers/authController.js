const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username & password wajib diisi" });
    }

    try {
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Login berhasil", token });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Gagal login", error });
    }
};
