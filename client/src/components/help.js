import imageCompression from "browser-image-compression";

export const handleImage = async (file, CB) => {
  const options = {
    maxSizeMB: 0.01,
    maxWidthOrHeight: 1080,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    console.log(compressedFile.size);
    reader.onload = () => CB(reader.result);
  } catch (error) {
    CB(error.message);
  }
};
