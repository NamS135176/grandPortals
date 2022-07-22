import Resizer from "react-image-file-resizer";

export const resizeImage = (file, maxSize = 1280, quality = 100) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      maxSize,
      maxSize,
      'JPEG',
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });
};
