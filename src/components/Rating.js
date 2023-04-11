import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false }) {
  const className = `rating-star ${selected ? "selected" : ""}`;
  return <span className={className}>★</span>;
}

function Rating({ value = 0 }) {
  return (
    <div>
      {RATINGS.map((rating) => {
        return <Star key={rating} selected={value >= rating} />;
      })}
    </div>
  );
}

export default Rating;
