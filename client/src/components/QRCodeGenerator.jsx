import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
const QRCodeGenerator = () => {
  
  const [url, setUrl] = useState('');
  const [qrCodes, setQrCodes] = useState([]);
  
  useEffect(() => {
    const fetchQrCode = async() => {
      const response = await axios.get('http://localhost:2000/api/qrCodes');
      setQrCodes(response.data);
    }

    fetchQrCode();
  }, []);

  const createQrCode = async() => {
    const response = await axios.post('http://localhost:2000/api/qrCode', {
      destinationUrl: url,
    });

    setQrCodes([...qrCodes, response.data]);
    console.log(response.data);
    setUrl("");
    
  };

  const updateQr = async(shortCode, newUrl) => {
    try{
  
      await axios.put(`http://localhost:2000/api/qrCode/${shortCode}`, {
        destinationUrl: newUrl,
      });
      setQrCodes((prevQrCode) => 
        prevQrCode.map((qr) => 
          qr.shortCode === shortCode 
          ? {...qr, destinationUrl: newUrl} 
          : qr
        )
      );
    }catch(err){
      console.error("Error updating QR code:", err);
    }
    
  };
  return (
    <div>
      <input 
        type="text" 
        placeholder='Enter URL'
        className=''
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={createQrCode}>Generate QR Code</button>

      <ul>
        {qrCodes.map(qr => (
          <li key={qr.shortCode}>
            <p>Short Code: {qr.shortCode}</p>
            <p>Current Url: {qr.destinationUrl}</p>

            <QRCode value={`localhost:2000/${qr.shortCode}`} size={150} />

            <input 
              type="text" 
              placeholder="new URL"
              onChange={(e) => updateQr(qr.shortCode, e.target.value)}
            />

          </li>
          
          
        ))}
      </ul>
      
      {console.log(qrCodes)}
      {/* {<QRCode
            title="qr-sample"
            value={value}
      />} */}
      
    </div>
  )
}

export default QRCodeGenerator
