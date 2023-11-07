import * as twilio from "twilio";

const accountSid: string = "AC9b1fb581a099ce3af5becbbd0d8f1332";
const authToken: string = "ac6b567700b81ba8645bbd6f1d925f3e";
const serviceSid: string = "VA1c6ebd99cd8d4d01145f49b3277c96f4";

if (!accountSid || !authToken || !serviceSid) {
  throw new Error("Twilio credentials are missing.");
}

const client: twilio.Twilio = require("twilio")(accountSid, authToken);
const verify = client.verify.v2.services(serviceSid);

export const sentOtp = (mobileNo: number): Promise<string> => {
  console.log("in the Twilio sendOtp");
  console.log(mobileNo);

  // Assuming that 'verify' is properly obtained from your Twilio client
  return new Promise((resolve, reject) => {
    verify.verifications
      .create({
        to: `+91${mobileNo}`,
        channel: "sms",
      })
      .then((verification: any) => {
        console.log(verification);
        resolve(verification.sid);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};



export const verifyOtp = (phone: string, otp: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    verify.verificationChecks
      .create({
        to: '+91' + phone,
        code: otp
      })
      .then((verification) => {
        resolve(verification.status === 'approved');
      })
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  })
}