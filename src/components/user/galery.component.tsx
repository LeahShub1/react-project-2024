import React, { useState } from 'react';
import { Modal } from './Modal.component';
import '../../styles/gallery.style.css';

import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';
import image6 from '../../assets/6.jpg';
import image7 from '../../assets/7.jpg';
import image8 from '../../assets/8.jpg';
import image9 from '../../assets/9.jpg';
import image10 from '../../assets/10.jpg';
import image11 from '../../assets/11.jpg';
import image12 from '../../assets/12.jpg';
import image13 from '../../assets/13.jpg';
import image14 from '../../assets/14.jpg';
import image15 from '../../assets/15.jpg';
import image16 from '../../assets/16.jpg';
import image17 from '../../assets/17.jpg';
import image18 from '../../assets/18.jpg';
import image19 from '../../assets/19.jpg';
import image20 from '../../assets/20.jpg';
import image21 from '../../assets/21.jpg';
import image22 from '../../assets/22.jpg';
import image23 from '../../assets/23.jpg';
import image24 from '../../assets/24.jpg';
import image25 from '../../assets/25.jpg';
import image26 from '../../assets/26.jpg';
import image27 from '../../assets/27.jpg';
import image28 from '../../assets/28.jpg';
import image29 from '../../assets/29.jpg';
import image30 from '../../assets/30.jpg';
import image31 from '../../assets/31.jpg';
import image32 from '../../assets/32.jpg';
import image33 from '../../assets/33.jpg';
import image34 from '../../assets/34.jpg';
import image35 from '../../assets/35.jpg';
import image36 from '../../assets/36.jpg';
import image37 from '../../assets/37.jpg';
import image38 from '../../assets/38.jpg';
import image39 from '../../assets/39.jpg';
import image40 from '../../assets/40.jpg';
import image41 from '../../assets/41.jpg';
import image42 from '../../assets/42.jpg';
import image43 from '../../assets/43.jpg';
import image44 from '../../assets/44.jpg';
import image45 from '../../assets/45.jpg';
import image46 from '../../assets/46.jpg';
import image47 from '../../assets/47.jpg';
import image48 from '../../assets/48.jpg';
import image49 from '../../assets/49.jpg';
import image50 from '../../assets/50.jpg';
import image51 from '../../assets/51.jpg';
import image52 from '../../assets/52.jpg';
import image53 from '../../assets/53.jpg';
import image54 from '../../assets/54.jpg';
import image55 from '../../assets/55.jpg';
import image56 from '../../assets/56.jpg';
import image57 from '../../assets/57.jpg';
import image58 from '../../assets/58.jpg';
import image59 from '../../assets/59.jpg';
import image60 from '../../assets/60.jpg';
import image61 from '../../assets/61.jpg';
import image62 from '../../assets/62.jpg';
import image63 from '../../assets/63.jpg';
import image64 from '../../assets/64.jpg';
import image65 from '../../assets/65.jpg';
import image66 from '../../assets/66.jpg';
import image67 from '../../assets/67.jpg';
import image68 from '../../assets/68.jpg';
import image69 from '../../assets/69.jpg';
import image70 from '../../assets/70.jpg';
import image71 from '../../assets/71.jpg';
import image72 from '../../assets/72.jpg';
import image73 from '../../assets/73.jpg';
import image74 from '../../assets/74.jpg';
import image75 from '../../assets/75.jpg';
import image76 from '../../assets/76.jpg';
import image77 from '../../assets/77.jpg';
import image78 from '../../assets/78.jpg';
import image79 from '../../assets/79.jpg';


const images = [
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
    image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
    image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
    image31, image32, image33, image34, image35, image36, image37, image38, image39, image40,
    image41, image42, image43, image44, image45, image46, image47, image48, image49, image50,
    image51, image52, image53, image54, image55, image56, image57, image58, image59, image60,
    image61, image62, image63, image64, image65, image66, image67, image68, image69, image70,
    image71, image72, image73, image74, image75, image76, image77, image78, image79
  ];
  
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
