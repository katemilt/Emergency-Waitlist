const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pool = require("./db");
const crypto = require("crypto");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};

app.use(cors(corsOptions));

// Test database connection
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Admin login
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM admins WHERE username = $1", [username]);
        const admin = result.rows[0];

        if (!admin || admin.password !== password) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        req.session.adminId = admin.id;
        res.json({ message: "Login successful" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Admin logout
app.post("/auth/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Server error");
        }
        res.clearCookie('connect.sid');
        res.json({ message: "Logout successful" });
    });
});

// Add a new patient
app.post("/patients", async (req, res) => {
  const { fullname, severity } = req.body;
  const code = crypto.randomBytes(2).toString('hex').substring(0, 3).toUpperCase();

  try {
      const newPatient = await pool.query(
          "INSERT INTO patients (fullname, code, severity) VALUES ($1, $2, $3) RETURNING *",
          [fullname, code, severity]
      );
      res.json(newPatient.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

// Get all patients
app.get("/patients", async (req, res) => {
  try {
      const patients = await pool.query("SELECT * FROM patients ORDER BY severity DESC, join_time ASC");
      res.json(patients.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

// Delete a patient
app.delete("/patients/:id", async (req, res) => {
  const { id } = req.params;

  try {
      await pool.query("DELETE FROM patients WHERE id = $1", [id]);
      res.json({ message: "Patient deleted" });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

// Patient login
app.post("/auth/patient-login", async (req, res) => {
  const { fullname, code } = req.body;

  try {
      const result = await pool.query("SELECT * FROM patients WHERE fullname = $1 AND code = $2", [fullname, code]);
      const patient = result.rows[0];

      if (!patient) {
          return res.status(401).json({ error: "Invalid Credentials" });
      }

      res.json({ patientId: patient.id, message: "Login successful" });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

// Get patient position and wait time
app.get("/patients/:id/position", async (req, res) => {
  const { id } = req.params;

  try {
      const result = await pool.query("SELECT id, fullname, severity, join_time FROM patients ORDER BY severity DESC, join_time ASC");
      const patients = result.rows;
      const position = patients.findIndex(patient => patient.id === parseInt(id)) + 1;

      if (position === 0) {
          return res.status(404).json({ error: "Patient not found" });
      }

      res.json({ position });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

// Start server on port 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
