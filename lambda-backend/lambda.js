const axios = require("axios");
const AWS = require("aws-sdk");
const yelp = require("yelp-fusion");

// Setting AWS credentials.
AWS.config.region = process.env.AWS_CONFIG_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_CONFIG_IDENTITYPOOLID,
});

// Setting Yelp API key.
const client = yelp.client(process.env.YELP_API_KEY);

const rekognition = new AWS.Rekognition();

exports.handler = function (event, context) {
  const longitude = event.longitude;
  const latitude = event.latitude;
  const encodedImage = event.encodedImage;

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
          const restaurantData = JSON.parse(JSON.stringify(response.jsonBody));

          // hoping to return data in the following format:
          //returnData = {
          // restaurants: [
          //    {
          //        name:
          //        id: // for key in array
          //        categories: [{alias: "", title: ""},{...}]
          //        url:
          //        image_url:
          //        coordinates: {
          //            latitude:
          //            longitude:
          //        }
          //        address: {
          //          street: (location.address1)
          //          city: (city + , + state + zip)
          //     }
          // ]}

          // Filtering Yelp's JSON response for what we need
          var returnData = { mood: finalEmotion, restaurants: [] };
          var currentBusiness = {};
          var currentRestaurantData = {
            name: "",
            id: "",
            categories: {},
            url: "",
            image_url: "",
            coordinates: { latitude: "", longitude: "" },
            address: { street: "", city: "" },
          };

          for (var i = 0; i < restaurantData.businesses.length; i++) {
            currentBusiness = restaurantData.businesses[i];

            currentRestaurantData.name = currentBusiness.name;
            currentRestaurantData.id = currentBusiness.id;
            currentRestaurantData.categories = currentBusiness.categories;
            currentRestaurantData.url = currentBusiness.url;
            currentRestaurantData.image_url = currentBusiness.image_url;
            currentRestaurantData.coordinates = currentBusiness.coordinates;
            currentRestaurantData.address.street =
              currentBusiness.location.address1;
            currentRestaurantData.address.city = currentBusiness.location.city.concat(
              ", ",
              currentBusiness.location.state,
              " ",
              currentBusiness.location.zip_code
            );

            returnData.restaurants.push(currentRestaurantData);

            // Must reset this variable! For some reason its values can't be overridden once set.
            currentRestaurantData = {
              name: "",
              id: "",
              categories: "",
              url: "",
              image_url: "",
              coordinates: { latitude: "", longitude: "" },
              address: { street: "", city: "" },
            };
          }

          //   res.json(returnData);
          context.succeed(returnData);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
};

// const axios = require("axios");
// const AWS = require("aws-sdk");
// const yelp = require("yelp-fusion");

// // Setting AWS credentials.
// AWS.config.region = process.env.AWS_CONFIG_REGION;
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: process.env.AWS_CONFIG_IDENTITYPOOLID,
// });

// // Setting Yelp API key.
// const client = yelp.client(process.env.YELP_API_KEY);

// const rekognition = new AWS.Rekognition();

// exports.handler = function (event, context) {
//   const longitude = event.longitude;
//   const latitude = event.latitude;
//   //   res.json(returnData);
//   context.succeed(longitude);
// };
