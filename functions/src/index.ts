import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as e from 'express';
import { UserRecord } from 'firebase-admin/lib/auth';
import * as cors from 'cors';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp();
const cache = new Map();
let counterDate = new Date();

const transporter = nodemailer.createTransport({
  service: 'Yahoo',
  auth: {
    user: process.env.POST_USER,
    pass: process.env.POST_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const getMessage = (email: string | undefined, client: { city: string, country_name: string }) => {
  return {
    from: 'CV-Page <brylkovsky@yahoo.com>',
    to: email,
    subject: 'New profile watch',
    text: `Congratulations! Someone from ${client.city}/${client.country_name} viewed your CV form`
  };
};

const isSameDay = (date1: Date, date2: Date): boolean =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();


export const userEnter = functions
  .runWith({secrets: ['POST_USER', 'POST_PASSWORD']})
  .https
  .onRequest((request: e.Request, response: e.Response) => {
    cors({origin: true})(request, response, () => {
      const requestDate = new Date();
      if (cache.get(request.body.data.uid) === request.body.data.client.ip && isSameDay(requestDate, counterDate)) {
        response.send({data: {message: 'Ok'}});
        return;
      } else {
        counterDate = requestDate;
        cache.set(request.body.data.uid, request.body.data.client.ip);
        admin.auth().getUser(request.body.data.uid)
          .then((user: UserRecord) => transporter.sendMail(getMessage(user.email, request.body.data.client)))
          .then(() => response.send({data: {message: 'Accept'}}))
          .catch(err => response.status(400).send(err));
      }
    });
  });
