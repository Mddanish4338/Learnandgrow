import React from 'react';

const ImageColumn = ({ images, columnIndex }) => {
  const getColumnClasses = (index) => {
    switch (index) {
      case 0:
        return "flex flex-col justify-center items-end self-stretch pt-20 my-auto w-[172px]";
      case 1:
      case 2:
        return "flex flex-col self-stretch pt-8 my-auto w-32";
      case 3:
        return "flex flex-col justify-center self-stretch my-auto w-40";
      default:
        return "";
    }
  };

  const getImageClasses = (columnIndex, imageIndex) => {
    const baseClasses = "object-cover max-w-full shadow-md";
    if (columnIndex === 0) {
      return `${baseClasses} ${imageIndex === 0 ? "w-32 aspect-[0.67] min-h-[192px]" : "mt-4 aspect-[0.67] min-h-[258px] w-[172px]"}`;
    } else if (columnIndex === 3) {
      return `${baseClasses} ${imageIndex === 0 ? "w-40 aspect-[0.63] min-h-[255px]" : "mt-4 w-32 aspect-[0.78] min-h-[165px]"}`;
    } else {
      const aspectRatios = ["0.6", "0.6", "0.8"];
      const minHeights = ["212px", "215px", "160px"];
      return `${baseClasses} ${imageIndex > 0 ? "mt-4" : ""} w-32 aspect-[${aspectRatios[imageIndex]}] min-h-[${minHeights[imageIndex]}]`;
    }
  };

  return (
    <div className={getColumnClasses(columnIndex)}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          loading="lazy"
          className={getImageClasses(columnIndex, index)}
        />
      ))}
    </div>
  );
};

export default ImageColumn;