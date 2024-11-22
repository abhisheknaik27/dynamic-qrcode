import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import DownloadPngButton from "./DownloadPngButton";
import DownloadSvgButton from "./DownloadSvgButton";
import axios from "axios";
import InputButton from "./InputButton";
const QRUi = () => {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");

  const qrRef = useRef();

  const [isUrlValid, setIsUrlValid] = useState(true);

  const handleURLChange = (e) => {
    const input = e.target.value.trim();
    const urlPattern = /^(https?:\/\/)/;
    setUrl(input);

    setIsUrlValid(urlPattern.test(input) || input === "");
  };
  // useEffect(() => {
  //   if (shortCode) fetchQrCode();
  // }, [shortCode]);
  // const fetchQrCode = async () => {
  //   if (!shortCode) return;
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:2000/api/qrCode/${shortCode}`
  //     );
  //     destinationUrl(response.data.destinationUrl);
  //   } catch (err) {
  //     console.log("error in fetching data");
  //   }
  // };

  const generateQr = async () => {
    if (!url) {
      alert("Enter Valid url");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:2000/api/qrCode`, {
        destinationUrl: url,
      });
      setShortCode(response.data.shortCode);
      setDestinationUrl(url);
      setUrl("");
    } catch (err) {
      console.log("error in generating qr");
    }
  };

  const updateQr = async () => {
    if (!destinationUrl) {
      alert("Enter a valid URL");
      return;
    }
    try {
      await axios.put(`http://localhost:2000/api/qrCode/${shortCode}`, {
        destinationUrl: url,
      });
      alert("QR Updated");
      setDestinationUrl(url);
      setUrl("");
    } catch (err) {
      console.log("error updating qr");
      alert("Failed to Update");
    }
  };
  function clearForm() {
    setShortCode("");
    setDestinationUrl("");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-orange-500 text-center mb-4">
            Dynamic QR Generator
          </h3>
          <div className="flex items-center justify-center w-full h-60 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <div ref={qrRef}>
              {shortCode ? (
                <QRCode
                  value={`http://localhost:2000/api/qrCode/${shortCode}`}
                  size={200}
                />
              ) : (
                <p className="text-gray-400">QR will appear here</p>
              )}
            </div>
          </div>

          {shortCode && (
            <div className="text-gray-500 flex-col gap-2 mt-3 font-semibold">
              <div className="flex flex-col justify-center items-center">
                <p className="text-gray-400">Current Link</p>
                <p className="text-gray-800 mb-3">{destinationUrl}</p>
              </div>
              <div className="flex border-t-2 pt-3 flex-col justify-center items-center overflow-clip">
                <p className="text-gray-400">Static Link</p>
                <p className="text-gray-800">
                  {`http://localhost:2000/api/qrCode/${shortCode}`}
                </p>
              </div>
            </div>
          )}

          {shortCode ? (
            <div className="flex justify-between mt-3 gap-3">
              <DownloadSvgButton qrRef={qrRef} shortCode={shortCode} />
              <DownloadPngButton qrRef={qrRef} shortCode={shortCode} />
            </div>
          ) : null}
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Website URL
            </label>
            <input
              type="url"
              placeholder="https://www.example.com"
              value={url}
              onChange={handleURLChange}
              maxLength={80}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-100 ${
                isUrlValid
                  ? "border-gray-300 focus:ring-blue-100"
                  : "border-red-500 focus:ring-red-200"
              }  text-blue-600`}
            />
            {!isUrlValid && (
              <p className="text-red-400 text-sm mt-1">
                URL must start with http:// or https://
              </p>
            )}
          </div>
          {shortCode
            ? isUrlValid && (
                <button
                  onClick={updateQr}
                  className="w-full bg-orange-200 text-black py-2 rounded-lg hover:bg-orange-300 transition:mb-4"
                >
                  Update QR
                </button>
              )
            : isUrlValid && (
                <button
                  onClick={generateQr}
                  className="w-full bg-orange-200 text-black py-2 rounded-lg hover:bg-orange-300 transition:mb-4"
                >
                  Generate QR
                </button>
              )}

          <button
            onClick={clearForm}
            className="w-full mt-3 bg-orange-200 text-black py-2 rounded-lg hover:bg-orange-300 transition:mb-4"
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRUi;
