import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import * as express from "express";
import * as cors from "cors";

admin.initializeApp();

const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

app.get('/goty', async (req, res) => {
    const ref = db.collection("goty");
    const snapshot = await ref.get();
    const goty = snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        };
    }
    );
    res.json(goty);
});

exports.api = functions.https.onRequest(app);