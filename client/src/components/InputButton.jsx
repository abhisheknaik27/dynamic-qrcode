import React, { useState } from "react";

const InputButton = ({ setUrl, url }) => {
  const validateUrl = (url) => {
    const urlRegex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return urlRegex.test(url);
  };
  const [urlError, setUrlError] = useState("");
  const handleURLChange = (e) => {
    const input = e.target.value.trim();
    setUrl(input);

    if (!validateUrl(input)) {
      setUrlError("Invalid URL. Please start with http or https");
    } else {
      setUrlError("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="https://www.example.com"
        value={url}
        onChange={handleURLChange}
        maxLength={80}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-100 text-blue-600"
      />
      {urlError && <p>Error</p>}
    </div>
  );
};

export default InputButton;
