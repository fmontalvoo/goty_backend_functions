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

app.post('/goty/:id', async (req, res) => {
    const id = req.params.id;
    const ref = db.collection('goty').doc(id);
    const snapshot = await ref.get();
    if (snapshot.exists) {
        const data: any = snapshot.data();
        // data.votes++;
        // await ref.set(data);
        ref.update({ votes: data.votes + 1 });
        res.status(200).json({
            ok: true,
            message: 'Registro modificado correctamente',
        });
    } else {
        res.status(404).json({
            ok: false,
            message: 'No existe un registro con ese ID',
        });
    }

});

export const api = functions.https.onRequest(app);