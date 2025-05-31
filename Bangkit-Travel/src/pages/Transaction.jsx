import React from "react";
import { useState } from "react";
import axios from "axios";

const Transaction = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("apiKey", "24405e01-fbc1-45a5-9f5a-be13afcd757c");

    axios.post("https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        setImageUrl(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Upload Image</h1>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Upload
        </button>

        {imageUrl && (
          <div className="mt-6 text-center">
            <img src={imageUrl} alt="uploaded" className="w-full h-auto rounded-md shadow-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
