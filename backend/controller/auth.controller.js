import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

import { db } from "../src/index.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("🚀 ~ signup ~ req.body:", req.body);

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const checkSql = "SELECT * FROM admin WHERE email = ?";
    console.log("🚀 ~ signup ~ checkSql:", checkSql);
    db.query(checkSql, email, async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (
        results.length > 0 &&
        results[0].email.toLowerCase() === email.toLowerCase()
      ) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Hash password

      const insertSql =
        "INSERT INTO admin (firstName, lastName, email, password,role) VALUES (?, ?, ?, ?,?)";
      const values = [firstName, lastName, email, password, "admin"];

      db.query(insertSql, values, (err, result) => {
        console.log("coming");
        if (err) {
          console.error("Insert error:", err.message);
          return res.status(500).json({ message: "Insert failed" });
        }
        console.log(result);
        return res.status(201).json({
          message: "User registered successfully",
          userId: result.insertId,
        });
      });
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const customerSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("🚀 ~ signup ~ req.body:", req.body);

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const checkSql = "SELECT * FROM admin WHERE email = ?";
    console.log("🚀 ~ signup ~ checkSql:", checkSql);
    db.query(checkSql, email, async (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (
        results.length > 0 &&
        results[0].email.toLowerCase() === email.toLowerCase()
      ) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const insertSql =
        "INSERT INTO admin (firstName, lastName, email, password,role) VALUES (?, ?, ?, ?,?)";
      const values = [firstName, lastName, email, password, "customer"];

      db.query(insertSql, values, (err, result) => {
        console.log("coming");
        if (err) {
          console.error("Insert error:", err.message);
          return res.status(500).json({ message: "Insert failed" });
        }
        console.log(result);
        return res.status(201).json({
          message: "User registered successfully",
          userId: result.insertId,
        });
      });
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🚀 ~ login ~ email:", email);

  try {
    const sql = "SELECT * FROM admin WHERE email = ?";

    db.query(sql, [email], async (err, data) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (data.length === 0) {
        return res.status(400).json({ message: "Invalid length credentials" });
      }

      const user = data[0];
      console.log(user);
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }

      generateToken(user.id, res);

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
