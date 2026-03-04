# Supplier Risk Management Dashboard (Automotive MFG)

A Proof of Concept (POC) for a modern, data-driven web application designed to monitor supplier performance, assess risks, and manage supply chain alerts in the automotive manufacturing sector. This dashboard provides a centralized "Control Tower" for supply chain managers and procurement officers to make informed decisions.

## 🚀 Key Features

This POC demonstrates a rich set of features essential for effective supply chain management:

*   **Executive Dashboard:** A high-level overview providing at-a-glance insights into key performance indicators (KPIs), supplier risk distribution, and overall performance trends over time.
*   **Interactive Data Visualization:** Utilizes Apache ECharts to render dynamic and responsive charts, including:
    *   **Pie Charts** for visualizing the spread of suppliers across different risk levels.
    *   **Line Charts** for tracking historical performance metrics like Quality, Delivery, and Cost.
    *   **Stacked Bar Charts** for showing the composition of risk categories over time.
    *   **Radar Charts** for a multi-dimensional comparison of top-performing suppliers.
*   **Performance Analytics:** A dedicated module for deep-diving into supplier metrics, featuring time-range filtering (1M, 3M, 6M, 1Y) to analyze performance over different periods.
*   **Alert Management System:** An operational feed for tracking and managing supply chain disruptions. Users can filter alerts by severity, type (e.g., Quality, Delivery, Financial), and status (New, Acknowledged, Resolved).
*   **Fully Responsive Design:** The interface is built with a mobile-first approach, ensuring a seamless experience on desktops, tablets, and mobile devices.

## 🛠️ Technology Stack

This project is built with a modern, maintainable, and performant technology stack:

*   **Framework:** Angular (v19+)
*   **Runtime:** Node.js (v18.19.1+, v20.11.1+, or v22+)
*   **Architecture:** Standalone Components for a modular and tree-shakable structure, eliminating the need for NgModules.
*   **Styling:** Tailwind CSS for a utility-first, responsive design system that enables rapid UI development.
*   **Data Visualization:** Apache ECharts (via `ngx-echarts`) for powerful, interactive, and high-performance charting.
*   **Icons:** Lucide Angular for a clean, lightweight, and consistent icon set.
*   **Language:** TypeScript for robust type-safety and improved developer experience.

## 🏗️ Architectural Highlights

*   **Chart Library Migration:** The project was successfully migrated from **Chart.js (ng2-charts)** to **Apache ECharts**. This was a strategic decision to leverage ECharts' superior performance with large datasets, native support for advanced chart types (like Radar), and richer built-in interactivity options like tooltips and legends.
*   **Component-Based Structure:** The UI is composed of small, reusable components (e.g., `KpiCardsComponent`, `PerformanceChartsComponent`) that are assembled into larger page views like the Dashboard and Performance pages. This promotes code reuse and separation of concerns.
*   **Centralized Mock Data:** A typed data service in `src/app/lib/data.ts` simulates a backend API, providing consistent and type-safe mock data throughout the application. This allowed for rapid UI development and testing independent of a live backend.

## 🏁 Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:
*   **Node.js**: v18.19.1 or later (v20 LTS recommended)
*   **npm**: v10 or later

### Installation & Setup

1.  **Clone the repository** to your local machine.

2.  **Navigate to the project directory** in your terminal.

3.  **Install the required dependencies** by running the command:
    ```bash
    npm install
    ```

4.  **Run the development server** with the command:
    ```bash
    ng serve
    ```

The application will compile and be available at `http://localhost:4200/`. The server will automatically reload if you make any changes to the source files.
