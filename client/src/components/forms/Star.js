import StarRating from "react-star-ratings";

const Star = ({ numberOfStars, handleStarClick }) => {
  return (
    <>
      <StarRating
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
        numberOfStars={numberOfStars}
        changeRating={() => handleStarClick(numberOfStars)}
      />
      <br />
    </>
  );
};

export default Star;
