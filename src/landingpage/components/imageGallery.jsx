import React from 'react';
import ImageColumn from './imageColoumn';
import ContentSection from './ContentSection.jsx';

const ImageGallery = ({ images = [] }) => {  // ✅ Default empty array assigned
  const columnImages = [
    images.slice(0, 2),
    images.slice(2, 5),
    images.slice(5, 8),
    images.slice(8, 10)
  ];

  return (
    <section className="flex flex-wrap gap-10 items-center p-20 w-full max-md:px-5 max-md:max-w-full" aria-label="Image Gallery">
      <div className="flex flex-1 shrink gap-4 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
        {columnImages.map((columnImgs, index) => (
          <ImageColumn key={index} images={columnImgs} columnIndex={index} />
        ))}
      </div>
      <ContentSection />
    </section>
  );
};

export default ImageGallery;
