// src/components/Modal.jsx

import Button from "./Button";

function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel  = "Confirm",
  cancelLabel   = "Cancel",
  confirmVariant = "primary",
  confirmIcon   = null,
  cancelIcon    = null,
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position:"fixed", top:0, left:0, width:"100%", height:"100%",
      backgroundColor:"rgba(0,0,0,0.5)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor:"#fff", borderRadius:"12px",
        padding:"30px", maxWidth:"500px", width:"90%",
        boxShadow:"0 10px 40px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between",
          alignItems:"center", marginBottom:"20px" }}>
          <h2 style={{ margin:0, fontSize:"20px", color:"#1F3864" }}>{title}</h2>
          <button onClick={onClose} style={{ background:"none", border:"none",
            cursor:"pointer", color:"#555" }}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ marginBottom:"24px" }}>{children}</div>

        {/* Footer Buttons */}
        <div style={{ display:"flex", gap:"10px", justifyContent:"flex-end" }}>
          <Button
            label={cancelLabel}
            variant="secondary"
            icon={cancelIcon}
            onClick={onClose}
          />
          {onConfirm && (
            <Button
              label={confirmLabel}
              variant={confirmVariant}
              icon={confirmIcon}
              onClick={onConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
