import { useRef } from "react";

function FileInput({ onChange, value, name }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    console.log(nextValue);
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
