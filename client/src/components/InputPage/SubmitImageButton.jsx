import React, { Component } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import Button from "../Button";
import { toast, Slide } from "react-toastify";

const errorMessage = "ERROR: ";
const toastOptions = {
  position: "bottom-center",
  autoClose: 10000,
  transition: Slide,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

class SubmitImageButton extends Component {
  constructor(props) {
    super(props);
    this.state = { encodedImage: null, isFetching: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const image = this.props.image;

    this.getBase64(image, (result) => {
      this.setState({
        encodedImage: result,
      });

      // Preparing data to be sent to backend.
      const data = {
        longitude: this.props.longitude,
        latitude: this.props.latitude,
        encodedImage: this.state.encodedImage,
      };

      // Sending data to backend to be processed.
      trackPromise(
        axios
          .post("/api/upload", data)
          .then((response) => {
            // Formats returned data and send it back to parent
            const returnJSON = JSON.parse(JSON.stringify(response));

            const status = returnJSON.data.status;

            if (status === 200) {
              const returnToParentData = {
                mood: returnJSON.data.mood,
                restaurantName: returnJSON.data.restaurantName,
                restaurantLocation: returnJSON.data.restaurantLocation,
              };
              this.props.onSubmit(returnToParentData);
            } else if (status === 400) {
              toast.error(
                "Sorry, but we couldn't recognize a face in your photo! Please try again.",
                toastOptions
              );
            } else {
              toast.error(
                "Hm, I'm not sure what happened there. Please try again.",
                toastOptions
              );
            }
          })
          // not sure if the below code is necessary
          .catch((error) => {
            var alertMessage = errorMessage.concat(error.response.statusText);
            toast.error(alertMessage, toastOptions);
          })
      );
    });
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error in converting file to base64: ", error);
    };
  }

  render() {
    if (this.props.isActivated === "false") {
      return (
        <div>
          <Button
            buttonText="Get a restaurant suggestion!"
            isActivated={this.props.isActivated}
          />
        </div>
      );
    } else {
      return (
        <div>
          <label onClick={this.handleSubmit} htmlFor="photo-upload">
            <Button
              buttonText="Get a restaurant suggestion!"
              isActivated={this.props.isActivated}
            />
          </label>
          <input id="photo-upload" type="button" />
        </div>
      );
    }
  }
}

export default SubmitImageButton;
