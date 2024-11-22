import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

const DownloadPngButton = ({ qrRef, qrCodeValue }) => {
  const downloadPNG = async () => {
    if (!qrCodeValue) {
      alert("Generate a QR Code first");
      return;
    }
    const canvas = await html2canvas(qrRef.current);
    canvas.toBlob((blob) => {
      saveAs(blob, "qrCode.png");
    });
  };

  return (
    <button
      onClick={downloadPNG}
      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 w-full transition"
    >
      Download PNG
    </button>
  );
};

export default DownloadPngButton;
