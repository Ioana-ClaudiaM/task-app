const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('./database');

router.post('/signup', async( req, res) => {
    const {first_name, second_name, birth_date, password,email}=req.body;
     console.log(first_name,second_name,birth_date,password,email);
    const hashedPassword= await bcrypt.hash(password,10);
    const query= 'INSERT INTO users (second_name, first_name, birth_date, email, password) VALUES (?,?,?,?,?)';
    try{
    const conn= await pool.getConnection();
    await conn.query(query,[second_name, first_name, birth_date, email, hashedPassword]);
    conn.release();
    res.status(200).send("User registered with success!");
    }
    catch(error){
        console.error("Database error:", error);
        res.status(500).send("An intern error was occured.");
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query(query, [email]);
        console.log(rows);
        conn.release();

        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.status(200).json({ 
                    first_name: user.first_name, 
                    second_name: user.second_name 
                });
            } else {
                res.status(401).send("Invalid email or password");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("An internal error occurred.");
    }
});

module.exports=router;