import React from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

interface LikesProps {
  isClicked: boolean;
  onClick: () => void;
}

const Likes = ({ isClicked, onClick }: LikesProps) => {
  return (
    <div>
      {isClicked ? (
        <IoMdHeart onClick={onClick} color="#ff6b81" size={40} />
      ) : (
        <IoMdHeartEmpty onClick={onClick} color="#555" size={40} />
      )}
    </div>
  );
};

export default Likes;
