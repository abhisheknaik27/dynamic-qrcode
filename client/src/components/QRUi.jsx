import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

const QRUi = () => {
  const [url, setUrl] = useState("");
  const [qrCodeVal, setQrCodeVal] = useState("");
  const qrRef = useRef(null);

  const generateQr = () => {
    if (url) {
      setQrCodeVal(url);
      setUrl("");
    } else {
      alert("Enter Valid URL");
    }
  };

  const downloadPNG = async () => {
    if (!qrCodeVal) {
      alert("Generate a QR Code first");
      return;
    }
    const canvas = await html2canvas(qrRef.current);
    canvas.toBlob((blob) => {
      saveAs(blob, "qrCode.png");
    });
  };

  const downloadSVG = () => {
    if (!qrCodeVal) {
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
          <div
            ref={qrRef}
            className="flex items-center justify-center w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg "
          >
            {qrCodeVal ? (
              <QRCode className="p-2" value={qrCodeVal} size={150} />
            ) : (
              <p className="text-gray-400">QR Code will appear here</p>
            )}
          </div>

          {qrCodeVal && (
            <div>
              <h1 className="text-center mt-4 bg-blue-100 rounded-sm font-semibold p-2">
                {qrCodeVal}
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

          <button
            onClick={generateQr}
            className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Generate QR Code
          </button>
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
