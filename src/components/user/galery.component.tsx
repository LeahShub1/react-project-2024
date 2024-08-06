import React, { useState } from 'react';
import { Modal } from './Modal.component';
import '../../styles/gallery.style.css';

import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/11.jpg';
import image5 from '../../assets/5.jpg';
import image6 from '../../assets/6.jpg';
import image7 from '../../assets/7.jpg';
import image8 from '../../assets/8.jpg';
import image9 from '../../assets/9.jpg';
import image10 from '../../assets/10.jpg';
import image12 from '../../assets/12.jpg';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

export const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (src: string) => {
        setSelectedImage(src);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };
    return (
        <>
             <div className="gallery">
                {images.map((image, index) => (
                    <div key={index} className="gallery-item" onClick={() => handleImageClick(image)}>
                        <img src={image} alt={`Gallery item ${index}`} />
                    </div>
                ))}
            </div>
            {selectedImage && <Modal imageSrc={selectedImage} onClose={handleCloseModal} />}
        </>
    );
}
