import React, { useState, useEffect } from 'react';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const PicturePicker = ({ onPictureSelect }) => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      // Replace 'YOUR_BUCKET_NAME' with your actual S3 bucket name
      const bucketName = 'kiruthika-project3-bucket';
      const s3Client = new S3Client({
        region: 'us-east-1', // Replace with your bucket's region
      });

      const command = new ListObjectsV2Command({ Bucket: bucketName });
      const { Contents } = await s3Client.send(command);

      const pictureUrls = Contents.map((object) => ({
        key: object.Key,
        url: `https://${bucketName}.s3.amazonaws.com/${object.Key}`,
      }));

      setPictures(pictureUrls);
    } catch (error) {
      console.error('Error fetching pictures:', error);
    }
  };

  const handlePictureSelect = (url) => {
    onPictureSelect(url);
  };

  return (
    <div>
      <h2>Select a Picture:</h2>
      <ul>
        {pictures.map((picture) => (
          <li key={picture.key}>
            <img
              src={picture.url}
              alt={picture.key}
              style={{ height: '100px', width: '100px', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => handlePictureSelect(picture.url)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PicturePicker;
