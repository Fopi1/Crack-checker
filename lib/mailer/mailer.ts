"use server";

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendCrackedGameNotification = async (
  to: string,
  gameTitle: string
) => {
  await transporter.sendMail({
    from: '"CrackChecker" <noreply@crackchecker.com>',
    to,
    subject: `Игра "${gameTitle}" была крякнута`,
    html: `
    <p>Здравствуйте!</p>
      <p>Мы обнаружили, что игра <strong>${gameTitle}</strong> была крякнута.</p>
      <p>Зайдите на сайт, чтобы проверить подробности.</p>`,
  });
};
