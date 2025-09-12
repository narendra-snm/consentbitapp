import React from "react";

type PopupProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const InstallBannerPopup: React.FC<PopupProps> = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="popup-overlay1" role="dialog" aria-modal="true" aria-labelledby="install-banner-title">
      <div className="popup-box">
        <div className="flex down">
          <span id="install-banner-title" className="spanbox">
            We are installing the script in your site custom code.
          </span>
          <span className="spanbox">
            We are adding a banner on your project.
          </span>
        </div>

        <div className="gap">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallBannerPopup;
