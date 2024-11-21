import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import axios from "axios";

const QRUi = () => {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");

  const qrRef = useRef(null);

  useEffect(() => {
    if (shortCode) {
      fetchQrCode();
    }
  }, [shortCode]);

  const generateQr = async () => {
    if (!url) {
      alert("Enter Valid URL");
      return;
    }

    const response = await axios.post("http://localhost:2000/api/qrCode", {
      destinationUrl: url,
    });
    setShortCode(response.data.shortCode);
    setDestinationUrl(url);

    setUrl("");
  };

  const fetchQrCode = async () => {
    if (!shortCode) return;

    const response = await axios.get(
      `http://localhost:2000/api/qrCode/${shortCode}`
    );
    setDestinationUrl(response.data.destinationUrl);
  };

  const updateQr = async () => {
    if (!destinationUrl) {
      alert("Enter Valid URL");
      return;
    }
    await axios.put(`http://localhost:2000/api/qrCode/${shortCode}`, {
      destinationUrl: url,
    });

    alert("URL Updated Successfully");
    setDestinationUrl(url);
    console.log(url, shortCode, destinationUrl);
  };
  const downloadPNG = async () => {
    if (!shortCode) {
      alert("Generate a QR Code first");
      return;
    }
    const canvas = await html2canvas(qrRef.current);
    canvas.toBlob((blob) => {
      saveAs(blob, "qrCode.png");
    });
  };

  const downloadSVG = () => {
    if (!shortCode) {
      alert("Generate a QR Code first");
      return;
    }
    const svgElement = document.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    saveAs(blob, "qrcode.svg");
  };

  const reloadPage = () => {
    setUrl("");
    setQrCodeVal("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg ">
            {shortCode ? (
              <QRCode
                className="p-2"
                value={`http://localhost:2000/${shortCode}`}
                size={150}
                ref={qrRef}
              />
            ) : (
              <p className="text-gray-400">QR Code will appear here</p>
            )}
          </div>

          {shortCode && (
            <div>
              <h1 className="text-center mt-4 bg-blue-100 rounded-sm font-semibold p-2">
                Current URL: {destinationUrl}
              </h1>
              <div className="flex justify-evenly mt-4 ">
                <button
                  onClick={downloadPNG}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
                >
                  Download PNG
                </button>

                <button
                  onClick={downloadSVG}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
                >
                  Download SVG
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Enter URL / Text
            </label>
            <input
              type="text"
              placeholder="www.example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {shortCode ? (
            <button
              onClick={updateQr}
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update QR
            </button>
          ) : (
            <button
              onClick={generateQr}
              className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Generate QR Code
            </button>
          )}

          <button
            onClick={reloadPage}
            className="w-full bg-blue-300 text-white py-2 mt-4 rounded-lg hover:bg-blue-400 transition"
          >
            Clear Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRUi;
