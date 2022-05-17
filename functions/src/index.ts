import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });

export const getGOTY = functions.https.onRequest(async (request, response) => {
    const ref = db.collection("goty");
    const snapshot = await ref.get();
    const goty = snapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
        };
    }
    );
    response.json(goty);
});
