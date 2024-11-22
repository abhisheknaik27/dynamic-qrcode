import { saveAs } from "file-saver";

const DownloadSvgButton = ({ qrValue }) => {
  const downloadSVG = () => {
    if (!qrValue) {
      alert("Generate a QR Code first");
      return;
    }
    const svgElement = document.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    saveAs(blob, "qrcode.svg");
  };
  return (
    <button
      onClick={downloadSVG}
      className="bg-green-600 w-full text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
    >
      Download SVG
    </button>
  );
};

export default DownloadSvgButton;
