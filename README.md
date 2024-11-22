# Dynamic QR Code Generator

Dynamic QR Code Generator application allows users to generate a dynamic QR code that links to a website, update its destination URL, and download the QR code in PNG or SVG format.

## Features
### Dynamic QR Code Generation: Users can generate QR codes that point to URLs.
### Update URL: Users can update the destination URL of an existing QR code without changing the QR code itself.
### Download Options: Users can download the QR code as PNG or SVG.
### Responsive UI: The application has a responsive UI built with Tailwind CSS.
### Backend Integration: The backend is powered by Node.js with Express and MongoDB.

## Technologies
Frontend: React, Tailwind CSS, react-qr-code, html2canvas, file-saver
Backend: Node.js, Express, MongoDB
Database: MongoDB (hosted on MongoDB Atlas)
Development Tools: npm, Postman (for API testing)
Packages: react-qr-code(to generate qr); html2canvas , file-saver (to save image), axios (backend connection)