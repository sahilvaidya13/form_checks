const express = require("express");
const Applicant = require("./models/Applicant");
const sequelize = require("./sequelize");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("Models synced with the database.");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/api/fetchall", async (req, res) => {
  try {
    const all_apps = await Applicant.findAll({ where: { status: null } });

    res.json(all_apps);
  } catch (err) {
    res.json(err);
  }
});

app.post("/api/addApplicant", async (req, res) => {
  const {
    country,
    mission,
    nationality,
    dob,
    email,
    expectedDate,
    visaType,
    purpose,
    captcha,
  } = req.body;

  try {
    const lastApplicant = await Applicant.findOne({
      order: [["applicant_id", "DESC"]],
    });
    const lastApplicantId = lastApplicant ? lastApplicant.applicant_id : 1000;
    const newApplicantId = lastApplicantId + 1;
    const newApplicant = await Applicant.create({
      applicant_id: newApplicantId,
      country,
      mission,
      nationality,
      dob,
      email,
      expectedDate,
      visaType,
      purpose,
      captcha,
    });

    res.status(201).json({ data: newApplicant });
  } catch (err) {
    console.error("Error creating new applicant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/editStatus/:id/:status_val", async (req, res) => {
  const { id, status_val } = req.params;
  console.log(id, status_val);
  const myid = Number(id);
  try {
    const applicant = await Applicant.findOne({
      where: { applicant_id: myid },
    });
    if (!applicant) {
      return res.status(404).json({ error: "Applicant not found" });
    }

    applicant["status"] = status_val;

    await applicant.save();
    if (status_val === "accept") {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.in",
        port: 465,
        secure: true, // Use SSL/TLS
        auth: {
          user: "blacksparrowdevs@zohomail.in",
          pass: "Sparrow@Tech",
        },
      });
      console.log(applicant["email"]);
      const mailOptions1 = {
        from: "blacksparrowdevs@zohomail.in",
        to: `${applicant["email"]}`,
        subject: `Application Accepted`,
        html: `<p>Dear User,</p>
          <p>Greetings, Your Visa Application has been successfully approved.`,
      };

      transporter.sendMail(mailOptions1, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({ ok: false, message: "Error sending mails" });
        } else {
          res
            .status(200)
            .json({ ok: true, message: "Email sent successfully" });
        }
      });
    } else {
      res.status(200).json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
});
app.listen("5000", () => {
  console.log("Server running on port..");
});
