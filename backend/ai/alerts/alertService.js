// ai/alerts/alertService.js
import nodemailer from "nodemailer";
import twilio from "twilio";
import fetch from "node-fetch";
import config from "./alertConfig.js";

// Twilio for SMS
const smsClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

export const sendSMS = async (to, message) => {
  if (!config.channels.sms) return;
  try {
    await smsClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to
    });
    console.log(`SMS sent to ${to}`);
  } catch (err) {
    console.error("SMS Error:", err.message);
  }
};

export const sendEmail = async (to, subject, message) => {
  if (!config.channels.email) return;
  try {
    const transporter = nodemailer.createTransport({
      host: config.email.smtpHost,
      port: config.email.smtpPort,
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    });

    await transporter.sendMail({
      from: `"SmartCampus" <${config.email.user}>`,
      to,
      subject,
      text: message
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error("Email Error:", err.message);
  }
};

export const sendWhatsApp = async (to, message) => {
  if (!config.channels.whatsapp) return;
  try {
    await fetch("https://api.whatsapp.com/send", {
      method: "POST",
      headers: { "Authorization": `Bearer ${config.whatsapp.providerApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ to, message })
    });
    console.log(`WhatsApp message sent to ${to}`);
  } catch (err) {
    console.error("WhatsApp Error:", err.message);
  }
};
