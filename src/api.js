const BASE_URL = "https://learn.codeit.kr/3101";

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
  if (!response.ok) {
    throw new Error("리뷰를 불러오지 못했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function createReviews(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 생성하지 못했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function updateReview(id, formData) {
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 수정하지 못했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteReview(id) {
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("리뷰를 삭제하지 못했습니다.");
  }
  const body = await response.json();
  return body;
}
