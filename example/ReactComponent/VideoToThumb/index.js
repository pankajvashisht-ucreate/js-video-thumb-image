import React, { useState } from 'react';
import thumbImage from 'js-video-thumb-image';

const VideoToThumb = () => {
  const [viewImage, setViewImage] = useState('');
  const createThumb = async event => {
    const { File, error, imageUrl } = await thumbImage(
      event.target.files[0],
      'mythumbimage.png'
    );
    // console.log('Use File object', File);
    if (!error) {
      setViewImage(imageUrl);
    }
  };
  return (
    <>
      <input type="file" accept="video.*" onChange={createThumb} />
      <img src={viewImage} alt="img" />
    </>
  );
};

export default VideoToThumb;
