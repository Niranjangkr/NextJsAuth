import nodemailer from 'nodemailer';
import User from "@/models/UserModel";
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // make a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log("token hashed");
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                VerifyToken: hashedToken,
                VerifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }
        // create trasnporter
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS
            }
          });

        const mailOptions = {
            from: 'Niranjan@gmail.com',
            to: email,
            subject: emailType ===  "VERIFY"? "Verify Your Email": "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType ===  "VERIFY"?"verifyemail":"resetpassword"}?token=${hashedToken}">here</a> to ${emailType ==="VERIFY"?"Verify your email":"Reset Your Password"}
            or copy and paste the link in the browser. <br> ${process.env.DOMAIN}/${emailType ===  "VERIFY"?"verifyemail":"resetpassword"}?token=${hashedToken} 
            </p>`
        }
        console.log("sending ahead")
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.messagae)
    }
}