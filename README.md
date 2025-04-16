# 🗺️ Collaborative Trip Planner & Wallet

Plan routes, manage shared budgets, track expenses, and collaborate seamlessly with your group on your next adventure! This platform combines trip logistics with financial tracking in one easy-to-use Single Page Application (SPA).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](#)

<!-- Add placeholders for build status, deployment status etc. if applicable -->
<!-- [![Build Status](https://img.shields.io/travis/your_username/your_repo.svg?style=for-the-badge)](https://travis-ci.org/your_username/your_repo) -->

---

## ✨ Overview

Planning group trips often involves scattered information – routes in one app, budgets in spreadsheets, and expenses tracked via chat messages. This project aims to consolidate these core aspects into a single platform.

Users can create a "Trip Session," invite participants, plan routes visually using OpenStreetMap, set a collective budget (visualized as "Tokens"), track expenses contributed by different members, and see automatically calculated balances. To manage resources, trip data is automatically cleared 7 days after its creation or conclusion (configurable).

---

## 🚀 Key Features

*   **Interactive Route Planning:** Visualize your journey on OpenStreetMap using Leaflet. Add start/end points, waypoints, and points of interest. Integrates with routing engines (like OSRM or others) to display calculated routes, distances, and estimated times.
*   **💰 Budget Management (Token System):** Set a total trip budget in your local currency (e.g., INR). The platform visualizes this budget as "Tokens" (1 Token = 1 Unit of Currency) for easy tracking.
*   **👥 Shared Expense Tracking:** Log expenses as they happen, noting who paid and which participants the expense covers.
*   **📊 Automatic Expense Splitting & Balances:** Expenses are automatically split among designated participants. The platform maintains a running balance for each user within the trip, showing who owes whom.
*   **🔑 Multiple Admin Roles:** Assign "Admin" roles within a trip session, granting permissions to manage the budget, edit/delete sensitive expense data, and potentially manage settlements.
*   **📄 Downloadable Reports:** Generate and download expense summaries and balance sheets in common formats (e.g., CSV, potentially PDF) for record-keeping.
*   **⏳ Temporary Data Storage:** Each trip session's data (routes, expenses, participants) is stored temporarily and automatically removed after a set period (e.g., 7 days) to ensure privacy and manage storage.
*   **🔒 User Authentication:** Secure user sign-up and login managed via Firebase Authentication.
*   **💨 Single Page Application (SPA):** Fluid and responsive user experience built with React.

---

## 🛠️ Technology Stack

*   **Frontend:** [React](https://reactjs.org/) (UI Library)
*   **Mapping:** [Leaflet.js](https://leafletjs.com/) with [React-Leaflet](https://react-leaflet.js.org/) (Interactive Maps)
*   **Routing Engine (Integration):** Designed to work with APIs like [OSRM](http://project-osrm.org/), Mapbox Directions, etc. (Route Calculation - *Specific service choice depends on deployment*)
*   **Backend & Database:** [Firebase](https://firebase.google.com/) (Backend-as-a-Service)
    *   **Authentication:** Firebase Authentication
    *   **Database:** Firestore (NoSQL Database)
    *   **Backend Logic/Cleanup:** Cloud Functions (for TTL/data expiry)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-First CSS Framework)
*   **Report Generation (Client-Side):** Libraries like [jsPDF](https://github.com/parallax/jsPDF) / [Papaparse](https://www.papaparse.com/)

---

## 💡 Core Concepts Explained

*   **Token System:** A user-friendly label for the budget amount. If the budget is 5000 INR, the trip has 5000 "Tokens". Spending 100 INR reduces the available tokens by 100.
*   **Temporary Storage:** Trip data is associated with a specific `tripId`. Using Firebase Cloud Functions triggered by Cloud Scheduler, we can query for trips older than 7 days (based on `creationTimestamp` or `endTimestamp`) and delete the corresponding Firestore documents and sub-collections.
*   **Admin Roles:** Within a specific trip document in Firestore, participant data includes a `role` field (`'admin'` or `'participant'`). Frontend UI and Firestore Security Rules enforce permissions based on this role.

---

## ⚙️ Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   A Firebase project set up. You will need your Firebase project configuration keys.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/collaborative-trip-planner.git
    cd collaborative-trip-planner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Firebase:**
    *   Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
    *   Enable Firestore Database, Firebase Authentication (e.g., Email/Password), and Cloud Functions.
    *   Get your Firebase project configuration (apiKey, authDomain, projectId, etc.) from your Firebase project settings.
    *   Create a `.env` file in the project root (copy from `.env.example` if provided).
    *   Add your Firebase configuration keys to the `.env` file:
        ```plaintext
        REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
        REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
        # Add any other required environment variables (e.g., routing API keys)
        ```

4.  **Deploy Firebase Rules & Functions:**
    *   Set up the Firebase CLI (`npm install -g firebase-tools` or `yarn global add firebase-tools`).
    *   Log in (`firebase login`).
    *   Configure Firestore security rules (found in `firestore.rules`). Deploy using `firebase deploy --only firestore:rules`.
    *   Deploy the Cloud Functions (found in the `functions` directory) needed for data cleanup (`firebase deploy --only functions`). *Ensure the functions are correctly written to handle data deletion based on timestamps.*

### Running the Project

*   Start the React development server:
    ```bash
    npm start
    # or
    yarn start
    ```
*   Open your browser and navigate to `http://localhost:3000` (or the port specified).

---

## ☁️ Deployment

This application is well-suited for deployment using:

*   **Frontend:** Firebase Hosting, Netlify, Vercel.
*   **Backend:** Firebase services are already cloud-based. Ensure Cloud Functions for cleanup are deployed and scheduled correctly.

---

## 🤝 Contributing

Contributions are welcome! Please follow standard fork/pull request workflows. Ensure code follows project conventions and includes tests where applicable.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📧 Contact

Prashanth K T - prashanthktgowda123@gmail.com

Project Link: [https://github.com/your-username/collaborative-trip-planner](https://github.com/your-username/collaborative-trip-planner) *(Replace with actual link)*