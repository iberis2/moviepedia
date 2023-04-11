import { useState } from "react";
import FileInput from "./FileInput";
import "./ReviewForm.css";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setValues({
      title: "",
      rating: 0,
      content: "",
    });
  };
  return (
    <form className="ReviewForm">
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        value={values.title}
        type="text"
        onChange={handleInputChange}
      />
      <input
        name="rating"
        value={values.rating}
        type="number"
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmit}>
        확인
      </button>
    </form>
  );
}

export default ReviewForm;
