# Mini Property Dashboard

A complete, fully functional **React-based Property Management Dashboard** built as part of a frontend assessment. This application demonstrates the ability to fetch, display, filter, manage, and update property listings using a clean and user-friendly UI.

---

## **Objective of the Assignment**

The goal of this project was to build a basic but complete **React frontend** that:

* Fetches and displays property listings from a mock API.
* Supports filtering and searching.
* Allows adding new properties through a form.
* Shows full details using a modal.

I extended the requirements by adding **extra features** such as:
 Image upload support (URL/File Upload options)
 Edit property functionality
 Delete property with confirmation modal
 Success popups for add/update/delete actions
 Google Maps-style coordinate fields
 Dynamic filters + improved UI/UX
 Modern UI with icons, badge labels, modals, overlays, and animations

---

#  Features Implemented

## 🔹 **1. Property Listings Page**

* Properties are fetched using a **GET** API (`/api/properties`).
* Each property is displayed using a **modern card layout**.
* Every card shows:

  * Image
  * Property Name
  * Property Type Badge
  * Location
  * Price
  * Short description
  * Action buttons: **View**, **Edit**, **Delete**

###  UI Screenshot

![Dashboard UI](image.png)

---

## 🔹 **2. Search & Filter Functionality**

* Search bar filters properties by **name or location**.
* Dropdown allows filtering by **property type**.
* Filters are combined dynamically.

###  Filter Dropdown

![Filter Dropdown](image-1.png)

###  Search Demo

![Search](image-2.png)

---

## 🔹 **3. Add Property Modal (Fully Functional Form)**

The app includes a full modal form with fields:

* Property Name
* Type (Dropdown)
* Location
* Price
* Description
* Image Upload Method (URL or File)
* Image URL or File Input
* Optional Coordinates (Latitude, Longitude)

After submission:
 Sends data to **POST /api/properties**
 Shows success popup
 Re-fetches properties automatically

###  Add Property Modal

![Add Modal](image-3.png)

---

## 🔹 **4. View Property Details Modal**

On clicking **View**, a modal opens showing:

* Full-size image
* Property type badge
* Complete details
* Price
* Description
* Latitude/Longitude (Google Maps–friendly)

###  View Modal

![View Modal](image-4.png)

---

## 🔹 **5. Edit Property Feature (Advanced)**

A full edit form reuses the Add Property UI, pre-filled with existing data.

* Updates property using **PUT /api/properties/:id**
* Shows success message after updating

###  Edit Modal

![Edit Property](image-5.png)

###  Update Success

![Success Update](image-6.png)

---

## 🔹 **6. Delete Property Feature**

* Delete confirmation modal ensures safety.
* Deletes using **DELETE /api/properties/:id**.
* Shows a success message afterward.

###  Delete Confirmation

![Delete](image-7.png)

###  Delete Success

![Delete Success](image-8.png)

---

#  API Setup (Required for This Project)

Use **json-server / MockAPI / Express** backend with endpoints:

```
GET /api/properties      → Fetch all properties
POST /api/properties     → Add a new property
PUT /api/properties/:id  → Update a property
DELETE /api/properties/:id → Remove a property
```

---

#  User Flow

1. App loads → Fetch properties via GET
2. Display properties in cards
3. User searches or filters
4. User adds a property → POST → auto refresh
5. User views property details in modal
6. User can edit or delete from detail or card

---

#  Extra Enhancements Added

 Image Upload System (URL + File Upload option)
 Smooth modals with animations
 Live search with real-time update
 Clean UX with icons and badges
 Mobile-responsive UI
 Price formatting (₹ currency)
 Dynamic counts (e.g., "Showing 4 of 4 properties")

---

#  Tech Stack

This project is built using the **MERN Stack**, which includes:

* **MongoDB** – Database to store property listings
* **Express.js** – Backend API layer
* **React.js** – Frontend UI
* **Node.js** – Server-side runtime environment

Additional Libraries:

* **Axios** – API calls
* **Lucide Icons** – UI icons
* **json-server / Express API** – Mock or real backend for testing

---

#  Final Notes

This project goes beyond the basic requirements and includes multiple professional frontend enhancements, focusing on:
 User experience
 Clean UI
 API interaction
 Maintainable code structure

---

#  MERN Architecture Overview

```
React (Frontend)
    ↓  Axios
Express.js API (Backend)
    ↓
MongoDB (Database)
```

Full flow: React UI → Axios → Express → MongoDB → back to UI.

---

#  Installation & Setup Guide

##  1. Clone the Repository

```
git clone <your-repo-url>
cd property-dashboard
```

##  2. Backend Setup

```
cd backend
npm install
```

Create `.env`:

```
PORT=5000
MONGO_URI=your-mongodb-uri
```

Run server:

```
npm run dev
```

##  3. Frontend Setup

```
cd frontend
npm install
npm start
```

---

#  Folder Structure

```
property-dashboard/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.jsx
└── README.md
```

---

#  MongoDB Schema Example

```
{
  name: String,
  type: String,
  location: String,
  price: Number,
  description: String,
  imageUrl: String,
  latitude: Number,
  longitude: Number,
  createdAt: { type: Date, default: Date.now }
}
```

---

#  Deployment Guide

##  Backend (Express)

Platforms: Render, Railway, Cyclic, Heroku.

1. Push backend to GitHub
2. Connect repository
3. Add env variables
4. Deploy

## Frontend (React)

Platforms: Vercel / Netlify

1. Build: `npm run build`
2. Upload or connect repo
3. Add API URL in `.env`
4. Deploy

---
