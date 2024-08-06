import React from 'react';
import '../../styles/Modal.css';

interface ModalProps {
    imageSrc: string;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ imageSrc, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={imageSrc} alt="Modal" />
                <button className="modal-close" onClick={onClose}>✕</button>
            </div>
        </div>
    );
}
