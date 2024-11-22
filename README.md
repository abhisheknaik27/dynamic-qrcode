# Dynamic QR Code Generator

The **Dynamic QR Code Generator** application allows users to generate a dynamic QR code that links to a website, update its destination URL, and download the QR code in PNG or SVG format.

## Features

- **Dynamic QR Code Generation**: Generate QR codes that point to URLs.
- **Update URL**: Update the destination URL of an existing QR code without changing the QR code itself.
- **Download Options**: Download the QR code as PNG or SVG.
- **Responsive UI**: A responsive user interface built with **Tailwind CSS**.
- **Backend Integration**: Powered by **Node.js**, **Express**, and **MongoDB** for backend functionality.

## Technologies

### Frontend:

- **React**: For building the dynamic user interface.
- **Tailwind CSS**: For fast styling and a responsive UI.
- **react-qr-code**: To generate QR codes based on a URL.
- **html2canvas**: To capture the QR code as an image.
- **file-saver**: To allow users to download the QR code in PNG or SVG format.
- **axios**: For making HTTP requests to the backend.

### Backend:

- **Node.js**: JavaScript runtime used for building the backend server.
- **Express**: Web framework for Node.js to handle routing.
- **MongoDB**: Database to store information about generated QR codes.
- **MongoDB Atlas**: Cloud-based MongoDB hosting service.

### Development Tools:

- **npm**: Package manager to install dependencies.
- **Postman**: API testing tool to test backend endpoints.
