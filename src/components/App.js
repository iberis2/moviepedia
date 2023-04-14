import ReviewList from "./ReviewList";
import { useState, useEffect } from "react";
import { createReviews, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    try {
      setIsLoading(true);
      setLoadingError(null);
      await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = await getReviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSubmit = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((preview) => {
      const splitIdx = preview.findIndex((item) => item.id === review.id);
      return [
        ...preview.slice(0, splitIdx),
        review,
        ...preview.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleBestClick}>베스트순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      <ReviewForm
        onSubmit={createReviews}
        onSubmitSuccess={handleCreateSubmit}
      />
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
