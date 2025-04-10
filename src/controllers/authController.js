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

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, /* {
            expiresIn: "1h",
        } */);

        res.json({ message: "Login berhasil", token });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Gagal login", error });
    }
};


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username sudah digunakan" });
        }

        // Hash password sebelum menyimpan ke database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Simpan user baru
        const newUser = await User.create({
            username,
            password: hashedPassword, // Simpan password yang sudah di-hash
        });

        res.status(201).json({ message: "Registrasi berhasil", userId: newUser.id });
    } catch (error) {
        console.error("Error saat registrasi:", error);
        res.status(500).json({ message: "Terjadi kesalahan server" });
    }
};
