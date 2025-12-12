# ChequeMate AI

**ChequeMate AI** is a smart, browser-based cheque printing application designed to simplify the process of filling and printing bank cheques. It ensures precise alignment with CTS-2010 standards and supports multiple bank layouts.

## 🌟 Features

*   **Multi-Bank Support**: Pre-configured layouts for major Indian banks including:
    *   Canara Bank
    *   HDFC Bank
    *   ICICI Bank
    *   State Bank of India (SBI)
    *   Bank of Baroda
    *   Punjab National Bank (PNB)
    *   Axis Bank
    *   Kotak Mahindra Bank
    *   And more...
*   **Live Preview**: Real-time visual preview of the cheque as you type, with support for bank-specific background images.
*   **Smart Features**:
    *   **Auto-Number to Words**: Automatically converts the numeric amount into words.
    *   **Smart Fill**: (AI-powered data extraction/filling - *if applicable based on code*).
*   **Print Calibration**: Fine-tune printing positions (X/Y offsets) to match your specific printer's margins.
*   **Customization**:
    *   Toggle "A/C Payee" crossing.
    *   Toggle "Bearer" strike-through.
    *   Upload custom cheque images for alignment verification.
*   **Privacy Focused**: Runs locally in your browser.

## 🛠️ Tech Stack

*   **Framework**: [React](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Runtime**: [Bun](https://bun.sh/) (or Node.js)

## 🚀 Getting Started

### Prerequisites

*   [Bun](https://bun.sh/) (Recommended) or Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/chequemate-ai.git
    cd chequemate-ai
    ```

2.  Install dependencies:
    ```bash
    bun install
    # or
    npm install
    ```

### Running Locally

Start the development server:

```bash
bun run dev
# or
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## 🖨️ Printing Guide

1.  **Select Bank**: Choose your bank from the dropdown menu.
2.  **Fill Details**: Enter the Payee Name, Date, and Amount. The amount in words is generated automatically.
3.  **Configure**: Check "A/C Payee" or "Bearer" options as needed.
4.  **Calibrate**:
    *   Do a test print on a blank A4 sheet.
    *   Place it over your cheque leaf to check alignment.
    *   Use the **X Offset** and **Y Offset** controls to adjust the text position if necessary.
5.  **Print**:
    *   Click "Print Cheque".
    *   **Important**: In the print dialog, ensure **Paper Size** is set to **A4**.
    *   Disable "Headers and Footers" in browser print settings.
    *   Insert your cheque leaf into the printer tray (usually face down, top edge first).

## 📂 Project Structure

*   `src/App.tsx`: Main application component.
*   `src/components/`: Reusable UI components (ChequePreview, SmartFill).
*   `src/utils/`: Utility functions (currency conversion) and constants (bank layouts).
*   `public/images/`: Static assets for cheque backgrounds.

## 📄 License

This project is licensed under the MIT License.
