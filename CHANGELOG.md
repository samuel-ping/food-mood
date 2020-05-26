# Changelog

[2.3.0] - 2020-05-25

## Changed

- Replaced react-image with progressive loading image component

[2.2.1] - 2020-05-15

## Added

- Button to check out GitHub

## Changed

- Made navbar a bit smaller

## Fixed

- Pushed something I was testing by accident whoops

[2.1.0] - 2020-05-12

## Added

- Error messages when there's an error with the picture
- Successfully set up AWS CodePipeline and CodeDeploy after much effort!

## Removed

- Traces of Heroku (at last, slow website loading times are over!)

## Fixed

- Server crash when there's an error in the backend... hopefully. Backstory: I put a picture of the landing page pasta in my app and the website broke
- Removed console.logs from production
- Removed unnecessary lines
- Re-added vignette effect to landing page

[1.4.4] - 2020-05-10

## Added

- Setting up AWS Codepipeline and CodeDeploy
  - Added deploy-scripts
  - Added appspec.yml

[1.4.3] - 2020-05-08

## Added

- Website description
- Loading for submit button!
- Loading icon for background images
- Submit button is now deactivated until an image is chosen

## Changed

- Trimmed down unnecessary packages
- Made Background reusable component
- Changed loading icon for background images to progressive loading
- Optimized images for faster loading times

## Fixed

- Changed "recommendations" to "recommendation"... for now
- Alert for mobile users now does not say the message pops up twice. In my defense, it popped up twice in development build, but not production for some reason...

[1.0.2] - 2020-05-07

## Added

- Warning for mobile users
- Finished base code, works as expected. Needs lots of fine tuning.
- FINALLY YES IT REDIRECTS TO RESULTS AFTER SUBMISSION HALLELUJAH

## Changed

- Changed structure to be more "top-to-bottom"
- Removed unnecessary code

[0.5.0] - 2020-05-06

## Added

- Backend is up and running

[0.4.0] - 2020-05-05

## Added

- Finished landing page
- Added favicon
- Finished photo input page, converting image to base64 is finally working

[0.1.0] - 2020-05-05

## Added

- Initial commit
