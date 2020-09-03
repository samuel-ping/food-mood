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

exports.handler = (event, context) => {
  let responseCode = 200;

  var retrievedData = JSON.parse(event.body);

  const longitude = retrievedData.longitude;
  const latitude = retrievedData.latitude;
  const encodedImage = retrievedData.encodedImage;

  var image = null;
  var jpg = true;

  try {
    image = encodedImage.split("data:image/jpeg;base64,")[1]; // Removes the image header information from the base64 string
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
      const finalEmotion = highestEmotion; // Setting the finally determined emotion.

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

          // Return data in the following format:
          // returnData = {
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

            // Must reset this variable, since for some reason its values can't be overridden once set.
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

          const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "X-Requested-With": "*",
          };

          let finalReturnData = {
            statusCode: responseCode,
            headers,
            body: JSON.stringify(returnData),
          };

          context.succeed(finalReturnData);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
};
