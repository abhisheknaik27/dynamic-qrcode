import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import DownloadPngButton from "./DownloadPngButton";
import DownloadSvgButton from "./DownloadSvgButton";
const QRUi = () => {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [url, setUrl] = useState("");
  const qrRef = useRef();
  function handleGenerateQr() {
    if (url) setQrCodeValue(url);
    else alert("Enter Valid URL");
  }
  function clearForm() {
    setQrCodeValue("");
    setUrl("");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 text-center mb-4">
            Preview
          </h3>
          <div className="flex items-center justify-center w-full h-60 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <div ref={qrRef}>
              {qrCodeValue ? (
                <QRCode value={qrCodeValue} size={200} />
              ) : (
                <p className="text-gray-400">QR will appear here</p>
              )}
            </div>
          </div>
          {qrCodeValue ? (
            <div className="flex justify-between mt-5 gap-3">
              <DownloadSvgButton qrRef={qrRef} />
              <DownloadPngButton qrRef={qrRef} qrCodeValue={qrCodeValue} />
            </div>
          ) : null}
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Website URL
            </label>
            <input
              type="text"
              placeholder="www.example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value.trim())}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-100 text-blue-600"
            />
          </div>

          <button
            onClick={handleGenerateQr}
            className="w-full bg-orange-200 text-black py-2 rounded-lg hover:bg-orange-300 transition:mb-4"
          >
            Generate QR
          </button>
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
