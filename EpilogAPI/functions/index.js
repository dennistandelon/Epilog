const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./apiKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const cors = require("cors");

const app = express();

// Enable Cross Origin Resource Sharing
app.use(cors());

// Connect Database
const db = admin.firestore();

// Default Route
app.get("/", (req, res)=>{
  return res.status(200).send("Epilog API v2.0");
});

// Book API
app.get("/book/", (req, res) =>{
  ( async () =>{
    try {
      const collectionData = db.collection("MsBook");
      const responses = [];

      await collectionData.get().then((data)=>{
        data.docs.map((item)=>{
          responses.push({
            BookID: item.data().BookID,
            Title: item.data().Title,
            CoverImage: item.data().CoverImage,
            Category: item.data().Category,
            Description: item.data().Description,
            Content: item.data().Content,
            Bookmark: item.data().Bookmark,
          });
        });

        return responses;
      });

      return res.status(200).send(responses);
    } catch (error) {
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

app.get("/book/key/:keyword", (req, res)=>{
  ( async () =>{
    try {
      const collectionData = db.collection("MsBook");
      const responses = [];

      await collectionData.get().then((data)=>{
        data.docs.map((item)=>{
          const title = (item.data().Title).toLowerCase();
          const key = req.params.keyword.toLowerCase();
          if ( title.indexOf(key) !== -1) {
            responses.push({
              BookID: item.data().BookID,
              Title: item.data().Title,
              CoverImage: item.data().CoverImage,
              Category: item.data().Category,
              Description: item.data().Description,
              Content: item.data().Content,
              Bookmark: item.data().Bookmark,
            });
          }
        });

        return responses;
      });

      return res.status(200).send(responses);
    } catch (error) {
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

app.get("/book/genre/:genre", (req, res) =>{
  ( async () =>{
    try {
      const collectionData = db.collection("MsBook");
      const responses = [];

      await collectionData.get().then((data)=>{
        data.docs.map((item)=>{
          const cat = (item.data().Category).toLowerCase();
          const genre = req.params.genre.toLowerCase();
          if ( cat == genre ) {
            responses.push({
              BookID: item.data().BookID,
              Title: item.data().Title,
              CoverImage: item.data().CoverImage,
              Category: item.data().Category,
              Description: item.data().Description,
              Content: item.data().Content,
              Bookmark: item.data().Bookmark,
            });
          }
        });

        return responses;
      });

      return res.status(200).send(responses);
    } catch (error) {
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// get bookmarked book
app.get("/bookmark/:id", (req, res) =>{
  ( async () =>{
    try {
      const collectionData = db.collection("MsBook");

      const responses = [];
      await collectionData.get().then((data)=>{
        data.docs.map((item)=>{
          const user = req.params.id;

          if ((item.data().Bookmark).indexOf(user) > -1) {
            responses.push({
              BookID: item.data().BookID,
              Title: item.data().Title,
              CoverImage: item.data().CoverImage,
              Category: item.data().Category,
              Description: item.data().Description,
              Content: item.data().Content,
              Bookmark: item.data().Bookmark,
            });
          }
        });
      });

      return res.status(200).send(responses);
    } catch (error) {
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// insert Bookmark Data
app.get("/bookmark/remove/:id/:book", (req, res) =>{
  ( async () =>{
    try {
      const collectionData = db.collection("MsBook");

      await collectionData.get().then((data)=>{
        data.docs.map((item)=>{
          const id = item.id;
          const DBbookid = String(item.data().BookID);
          const bookid = req.params.book;
          const user = req.params.id;
          if ( DBbookid == bookid ) {
            const bookmarkList = item.data().Bookmark;
            const index = bookmarkList.indexOf(user);
            bookmarkList.splice(index, 1);

            const bookmarkRef = collectionData.doc(id);
            bookmarkRef.update({Bookmark: bookmarkList});
            return;
          }
        });
      });

      return res.status(200).send({status: "Success", msg: "Data Added!"});
    } catch (error) {
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// delete Bookmark Data
app.get("/bookmark/add/:id/:book", (req, res) =>{
  ( async () =>{
    try {
      const collectionData = db.collection("MsBook");

      await collectionData.get().then((data)=>{
        data.docs.map((item)=>{
          const id = item.id;
          const DBbookid = String(item.data().BookID);
          const bookid = req.params.book;
          const user = req.params.id;
          if ( DBbookid == bookid ) {
            const bookmarkList = item.data().Bookmark;
            bookmarkList.push(user);

            const bookmarkRef = collectionData.doc(id);
            bookmarkRef.update({Bookmark: bookmarkList});
            return;
          }
        });
      });

      return res.status(200).send({status: "Success", msg: "Data Added!"});
    } catch (error) {
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

exports.app = functions.https.onRequest(app);
