import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios"
import { oauth2client } from "../utils/googleconfig.js";

const secretkey = process.env.secretkey;

const getclients = async (req, res) => {
  const result = await db.query("SELECT * FROM userdetails");
  res.status(200).json(result.rows);
};

const signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const olduser = await db.query("select * from userdetails where email=$1", [
      email,
    ]);
    if (olduser.rows.length > 0) {
      return res.json({ message: "User already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO userdetails (name,email,password) VALUES ($1,$2,$3) returning user_id`,
      [name, email, hashedpassword]
    );

    const userid = result.rows[0].user_id
    const token = jwt.sign({ id: userid }, secretkey, {
      expiresIn: "7d",
    });

    res.status(200).json({ success:true, signin:true, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query("SELECT * FROM userdetails WHERE email=$1 ", [
    email,
  ]);
  if (result.rows.length === 0) {
    res.json({ message: "no such email exists" });
  }
  const user = result.rows[0]
  const match = await bcrypt.compare(password, user.password);
  if (!match) {res.json({ message: "Password is Incorrect" });
    
  } 
  const userid = user.user_id
  const token = jwt.sign({ id: userid }, secretkey, {
    expiresIn: "7d",
  });
  res.json({ success:true, signin:false, token: token });
};

const adddetails = async (req, res) => {
  const { userid, age, gender, height, weight,bmi } = req.body;
  const result = await db.query(
    "insert into personalinfo (user_id,age,gender,height,weight,bmi) values ($1,$2,$3,$4,$5,$6)",
    [userid, age, gender, height, weight, bmi]
  );
  res.status(200).json({message:"details saved"})
};

const getdetails = async (req, res) => {
  const result = await db.query("SELECT * FROM personalinfo ");
  res.status(200).json(result.rows);
};

export const googlelogin = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).json({ message: "No code provided" });

    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const { email, name } = userRes.data;

    const result = await db.query("SELECT * FROM userdetails WHERE email=$1", [
      email,
    ]);

    let user;

    if (result.rows.length === 0) {
      const insertRes = await db.query(
        `INSERT INTO userdetails (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
        [name, email, null]  
      );
      user = insertRes.rows[0];
    } else {
      user = result.rows[0]
    }

    const token = jwt.sign({ id: user.user_id, email }, secretkey, {
      expiresIn: "7d",
    });

    return res.status(200).json({ message: "Success", token, user });
  } catch (err) {
    console.error("Google login error:", err.message);
    return res.status(500).json({ message: "Google login failed", error: err.message });
  }
};
export const getid = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1]; 
    const decoded = jwt.verify(token, secretkey)
    const result = await db.query(
      "SELECT * FROM userdetails WHERE user_id=$1",
      [decoded.id]
    );
    return res.status(200).json( result.rows[0] );
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token", error: err.message });
  }
};
export default { signin, login, getclients, adddetails, getdetails, googlelogin, getid };
