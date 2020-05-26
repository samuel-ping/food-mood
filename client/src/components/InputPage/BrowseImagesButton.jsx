import React, { Component } from "react";
import Button from "../Button";

class BrowseImageButton extends Component {
  // sends image input back to parent
  handleFileChange = (event) => {
    this.props.onFileChange(event.target.files[0]);
  };

  render() {
    return (
      <div>
        <label htmlFor="userphoto">
          <Button
            isImage="true"
            buttonText="Browse/Take Photos"
            isActive={this.props.isActive}
          />
        </label>
        <input
          id="userphoto"
          type="file"
          accept="image/*"
          onChange={this.handleFileChange}
        />
      </div>
    );
  }
}

export default BrowseImageButton;
