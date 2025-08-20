import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
  email /* where to send email for verify */,
  emailType /* to know why email is being sned ,for verify, forgotpassword etc*/,
  userId /* Id of the user */,
}: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10); //create a hashed token

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESETPASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
      host: process.env.HOST_NAME,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,

        // TODO add them to .env files
      },
    });

    console.log(
      process.env.HOST_NAME,
      typeof process.env.HOST_NAME,
      "HOSTNAME"
    );
    console.log(
      process.env.MAIL_FROM,
      typeof process.env.MAIL_FROM,
      "MAIL FROM"
    );
    console.log(process.env.PASS, typeof process.env.MAIL_FROM ,"PASS");
    console.log(process.env.MAIL_PORT , "PORT");
    console.log(process.env.USER, "USER");

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",

      html: ` <p> Click <a href = "${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy paste the link below in your beowser
      <br>
      ${process.env.domain}/verifyemail?token=${hashedToken}

      </p> `,
    };

    const mailOptionspassword = {
      from: process.env.MAIL_FROM,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",

      html: ` <p> Click <a href = "${
        process.env.domain
      }/resetpassword?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy paste the link below in your beowser
      <br>
      ${process.env.domain}/resetpassword?token=${hashedToken}

      </p> `,
    };

    if (emailType === "RESETPASSWORD") {
      const mailresponse = await transporter.sendMail(mailOptionspassword);
      return mailresponse;
    } else if (emailType === "VERIFY") {
      const mailresponse = await transporter.sendMail(mailOptions);
      return mailresponse;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
