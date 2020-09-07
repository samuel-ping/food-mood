# Food Mood

Food Mood is a web application that detects your mood from your selfie to suggest a nearby restaurant!

### How it works:

After submitting an image, the image is sent to Amazon Rekognition, which determines your emotion from the photo. Then, using Yelp's Fusion API, a restaurant is suggested to you based on the emotion!

#### Current Stack: React.js, AWS Lambda - Node.js, hosted on AWS Amplify.

## Food Mood v3

| ![version 3, view1](./screenshots/food-mood-v3-screenshot1.png) | ![version 3, view2](./screenshots/food-mood-v3-screenshot2.png) |
| :-------------------------------------------------------------: | :-------------------------------------------------------------: |
|                         _Landing Page_                          |                         _Results Page_                          |

I migrated the Express.js backend to AWS Lambda, and migrated the website from an AWS EC2 instance to AWS Amplify. I added a map to show where the restaurants are located, and improved the way the website looks.

#### Stack used: React.js, AWS Lambda - Node.js, hosted on AWS Amplify.

##### Other technologies used: AWS API Gateway.

## Food Mood v2.5

To introduce myself to AWS S3, I deployed this app in a public AWS S3 bucket, and delivered it via AWS Cloudfront for a day.

## Food Mood v2

#### Browse the repo: https://github.com/samuel-ping/food-mood/commit/60ea27ea983de19a43d2be7f0c18a49e1dd5698e

| ![version 2, view1](./screenshots/food-mood-v2-screenshot1.png) | ![version 2, view2](./screenshots/food-mood-v2-screenshot2.png) | ![version 2, view3](./screenshots/food-mood-v2-screenshot3.png) |
| :-------------------------------------------------------------: | :-------------------------------------------------------------: | :-------------------------------------------------------------: |
|                         _Landing Page_                          |                          _Input Page_                           |                         _Results Page_                          |

After the challenge ended, I decided to continue improving this project. I rebuilt this web app with React.js, Node.js and Express.js. It's an ERN stack! Since the free tier of Heroku is so slow, I manually deployed this app through an AWS EC2 instance using Nginx as a reverse proxy, and set up the security certificate that automatically renews itself. I also set up an AWS CodePipeline that automatically deploys changes to the live website using AWS CodeDeploy.

#### Stack used: React.js, Express.js, Node.js, hosted on AWS EC2 using Nginx.

##### Other technologies used: AWS CodePipeline & CodeDeploy.

## Food Mood v1

#### Browse the repo: https://github.com/samuel-ping/Old-Food-Mood

| ![version 1, view1](./screenshots/food-mood-v1-screenshot1.png) |
| :-------------------------------------------------------------: |
|                _Landing + Input + Results Page_                 |

The first version of Food Mood was built as an entry to Capital One's Software Engineering Summit challenge, and it was chosen! It was my first ever website, and I used Express.js, which delivered a static HTML page to the client. I used JavaScript to make the API calls, triggered from the HTML page.

#### Stack used: Express.js, HTML, CSS, JavaScript, hosted on Heroku.

You can check out the original project here: https://github.com/samuel-ping/Old-Food-Mood and the original coding challenge here: https://www.mindsumo.com/contests/d052bcf8-4580-4922-95ef-a9f6ceaf0f10.
