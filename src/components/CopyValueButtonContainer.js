import React, { useState } from 'react';
import CopyValueButton from './CopyValueButton';

const CopyValueButtonContainer = ({ className, value }) => {
  const [copied, setCopied] = useState(false);

  const copyValue = () => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.log('Failed to copy!');
      });
  };
  return (
    <CopyValueButton
      className={className}
      onClick={copyValue}
      copied={copied}
    />
  );
};

export default CopyValueButtonContainer;
