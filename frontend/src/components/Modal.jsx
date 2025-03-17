import React from 'react';
import '../App.css'; // Ensure you have a CSS file for styling

export default function Modal({ children, onClose }) {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <dialog className="modal" open>
        {children}
        <button className="close-btn" onClick={onClose}>Close</button>
      </dialog>
    </>
  );
}
