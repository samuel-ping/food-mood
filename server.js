require("dotenv").config();
const express = require("express");
const app = express();
const AWS = require("aws-sdk");
const yelp = require("yelp-fusion");
const cors = require("cors");
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));
// Solution for serving React app with client side routing and user refreshes page: https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build"), "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    };
});

app.use(express.json({ limit: "25mb" })); // limits size of photo input to 25mb
app.use(cors());

// Setting AWS credentials.
AWS.config.region = process.env.AWS_CONFIG_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_CONFIG_IDENTITYPOOLID,
});

// Setting Yelp API key.
const client = yelp.client(process.env.YELP_API_KEY);

const port = process.env.PORT || 5000;
const rekognition = new AWS.Rekognition();

app.post("/api/upload", (req, res) => {
  // Had to use .stringify() before .parse() for it to work for some reason.
  const sentData = JSON.stringify(req.body);
  const dataJSON = JSON.parse(sentData);
  const longitude = dataJSON.longitude;
  const latitude = dataJSON.latitude;
  const encodedImage = dataJSON.encodedImage;

  var image = null;
  var jpg = true;
  try {
    image = encodedImage.split("data:image/jpeg;base64,")[1];
  } catch (e) {
    jpg = false;
  }
  if (jpg == false) {
    try {
      image = encodedImage.split("data:image/png;base64,")[1];
    } catch (e) {
      console.log("Not an image file Rekognition can process");
      return;
    }
  }

  const buffer = new Buffer.from(image, "base64");

  // Setting parameters for Amazon Rekognition.
  const params = {
    Image: {
      Bytes: buffer,
    },
    Attributes: ["ALL"],
  };

  rekognition.detectFaces(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      console.log("There was an error parsing your photo.");
    } else if (data.FaceDetails.length === 0) {
      const returnData = {
        status: 400,
        message: "Your uploaded photo did not contain a face to analyze.",
      };
      console.log("GKERNWGKRENKRLEERROR GERORFEEROR");
      res.json(returnData);
    } else {
      const numPeople = data.FaceDetails.length;
      const EmotionsData = data.FaceDetails[0].Emotions; // Extracting the emotions from faces dataset.
      let highestConfidence, highestEmotion;

      // Finding the emotion that Rekognition is most confident in.
      for (var j = 0; j < numPeople; j++) {
        for (var i = 0; i < EmotionsData.length; i++) {
          if (i === 0) {
            highestConfidence = EmotionsData[i].Confidence;
            highestEmotion = EmotionsData[i].Type;
          } else {
            if (EmotionsData[i].Confidence > highestConfidence) {
              highestConfidence = EmotionsData[i].Confidence;
              highestEmotion = EmotionsData[i].Type;
            }
          }
        }
      }
      const finalEmotion = highestEmotion; // setting the finally determined emotion

      // Sending query to Fusion API with search term: "food " + finalMood.
      const searchTerm = "food ".concat(finalEmotion);
      client
        .search({
          term: searchTerm,
          latitude: latitude,
          longitude: longitude,
          limit: 10,
          open_now: true,
        })
        .then((response) => {
          const restaurantData = JSON.parse(
            JSON.stringify(response.jsonBody.businesses[0])
          );

          // hoping to return data in the following format:
          //returnData = {
          // restaurants: [
          //    {
          //        name:
          //        id: // for key in array
          //        url:
          //        image_url:
          //        coordinates: {
          //            latitude:
          //            longitude:
          //        }
          //        address: (location.address1)
          //     }
          // ]}
          const returnData = {
            status: 200,
            message: "Success!",
            restaurantName: restaurantData.name,
            restaurantLocation: restaurantData.location,
            mood: finalEmotion,
          };
          res.json(returnData);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
