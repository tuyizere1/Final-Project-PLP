const db = require('../config/db');

const getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if(err) return res.status(500).json({error: err});
        res.json(results);
    });
};

const addUser = (req, res) => {
    const { name, phone, email, address } = req.body;
    db.query('INSERT INTO users (name, phone, email, address) VALUES (?, ?, ?, ?)',
        [name, phone, email, address],
        (err, result) => {
            if(err) return res.status(500).json({error: err});
            res.json({message: 'User added', userId: result.insertId});
        }
    );
};

module.exports = { getAllUsers, addUser };

