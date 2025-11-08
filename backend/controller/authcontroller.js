import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
      return res.json({ message: "user already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO userdetails (name,email,password) VALUES ($1,$2,$3)`,
      [name, email, hashedpassword]
    );

    const newuser = await db.query("SELECT user_id from userdetails");
    const token = jwt.sign({ id: newuser.rows[0]._id }, secretkey, {
      expiresIn: "7d",
    });

    res.status(200).json({ token: token });
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
  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  const newuser = await db.query("SELECT user_id from userdetails");
  const token = jwt.sign({ id: newuser.rows[0]._id }, secretkey, {
    expiresIn: "7d",
  });
  if (match) {
    res.json({ message: "user logged in", user: user , token:token});
  } else {
    res.json({ message: "password is incorrect" });
  }
};

const adddetails = async(req,res) =>{
    const {user_id,age,gender,height,weight} = req.body
    const hinmeter = height/100
    const bmi = weight/ (hinmeter*hinmeter)
    const result = await db.query('insert into personalinfo (user_id,age,gender,height,weight,bmi) values ($1,$2,$3,$4,$5,$6)',[user_id,age,gender,height,weight,bmi])
    res.json(result.rows[0])
}

const getdetails = async (req, res) => {
  const result = await db.query("SELECT * FROM personalinfo ");
  res.status(200).json(result.rows);
};
export default { signin, login, getclients, adddetails, getdetails };
