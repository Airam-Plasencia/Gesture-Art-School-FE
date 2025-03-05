import React, { useState } from 'react';

const Gallery = () => {
  // Estado para controlar el modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lista de imágenes
  const images = [
    "https://skyryedesign.com/wp-content/uploads/2024/05/211174976261329-pin-image.jpg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyUzVQHGGxra0SNjyI5PecGDY98O-MX7ezB14PajrZ5FQbPs3yxPIPvH1mWOG-FVeSr6zDiW0B4hyphenhypheneO8x-GgUxO51OGNFXiyRKLqNvoBDr-F6a_KAzkR3VZOxkp9Z-pK0fM0N7yI5BoWU/s1600/F001-049.tif",
    "https://drawingamerica.com/wp-content/uploads/2022/06/Weston-Hand-Splash.jpg",
    "https://i.pinimg.com/564x/83/b8/11/83b81151678ec08d567f0ac1110d4ae9.jpg",
    "https://i.pinimg.com/736x/21/36/6d/21366d1ecb24bd65d04407a1191f2e5e.jpg",
    "https://pm1.aminoapps.com/6558/e2f746f79a2801933331f3bc98316f9c8b7e6f54_hq.jpg",
    "https://i.pinimg.com/736x/5e/f8/23/5ef823705ec2b14af29c9e4564575624.jpg",
    "https://www.animationmentor.com/wp-content/uploads/2020/01/Blog-MikeMatessi-Figures-1024x737.jpg",
    "https://www.skwigly.co.uk/wp-content/uploads/2014/10/06-Glen-Keane-Ariel.jpg",
    "https://i.pinimg.com/736x/7c/42/a4/7c42a4f1a1f04c6cbc5d236196cd05b4.jpg",
    "https://photos1.blogger.com/blogger/1742/1898/1600/keane1.jpg",
    "https://i.pinimg.com/564x/db/32/eb/db32eb19f39e895283539c9771a8d70a.jpg"
  ];

  
  const openModal = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  
  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage('');
  };

  
  const prevImage = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  
  const nextImage = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="group overflow-hidden rounded-lg shadow-lg">
            <img
              className="transform group-hover:scale-105 transition-transform duration-300 ease-in-out w-full h-auto"
              src={image}
              alt={`Imagen ${index + 1}`}
              onClick={() => openModal(image, index)}
            />
          </div>
        ))}
      </div>

      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg p-4 max-w-3xl mx-auto">
            
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 text-2xl font-bold hover:text-gray-800"
            >
              &times;
            </button>

            
            <button 
              onClick={prevImage} 
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-400 rounded-full p-2 "
            >
              ← 
            </button>
            
            <button 
              onClick={nextImage} 
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-400 rounded-full p-2 "
            >
              → 
            </button>

            
            <img 
              className="w-full max-h-screen object-contain rounded-lg" 
              src={selectedImage} 
              alt="Imagen ampliada"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

