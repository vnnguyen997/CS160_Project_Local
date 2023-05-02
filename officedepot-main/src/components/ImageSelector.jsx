import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { images } from "../productImageNames.js";
const ImageSelector = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    onImageChange(image);
  };

  return (
    <div>
      <Form.Group>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {selectedImage ? selectedImage.name : "Choose Image"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {images.map((image, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleImageSelect(image)}
              >
                {image.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      {selectedImage && (
        <div>
          <img src={selectedImage.src} alt={selectedImage.name} width="100%" />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
