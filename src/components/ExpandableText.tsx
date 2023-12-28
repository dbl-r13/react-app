import React, { ReactNode } from "react";

interface ExapandableTextProps {
  children: string;
  maxCount?: number;
  isFullText: boolean;
  onClick: () => void;
}

const ExpandableText = ({
  children,
  maxCount = 100,
  isFullText,
  onClick,
}: ExapandableTextProps) => {
  const truncatedText = children.substring(0, maxCount);
  const isShortText = children.length <= maxCount;
  return (
    <div>
      {isShortText && <p>{children}</p>}
      {!isShortText && isFullText && children}
      {!isShortText && !isFullText && `${truncatedText} ...`}
      {!isShortText && (
        <button className="btn btn-dark" onClick={onClick}>
          {isFullText ? "Less" : "More"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
