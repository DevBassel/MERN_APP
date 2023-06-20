import imageCompression from "browser-image-compression";

export const handleImage = async (file, CB) => {
  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 1920,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);

    reader.onload = () => CB(reader.result);
  } catch (error) {
     CB(error.message);
  }
};
