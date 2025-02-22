# TextSage 🤖 ~ HNG Frontend Stage 4 Task

TextSage is an AI-powered chat application that provides real-time message translation, text summarization, and intelligent conversation management. It is Built on the chrome in-built AI (uses Gemini nano) which is still in an experimental face so it only works on some selected browser.

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Author](#author)
- [Acknowledgment](#acknowledgment)

A modern web application built with Next.js for booking event tickets. The system provides a seamless booking experience with a multi-step form process and ticket management capabilities.

## <span id="features"> ✨ Core Functionality </span>

- **Chat Management:** Create, delete, and switch between chats with a persistent store using Zustand.
- **AI-Powered Actions:**
  - **Summarization:** Generate summaries for long messages using the Summarizer API.
  - **Translation:** Translate messages with support for multiple languages via the Translator API.
  - **Language Detection:** Identify the source language of a message and provide notifications if the language is not supported.
- **Responsive UI:** Fully responsive design with a mobile-friendly layout.
- **Theme Toggle:** Dark and light mode.
- **Sidebar Navigation:** Organized view of chats grouped by creation date (today, yesterday, previous).

## <span id="tech-stack">🛠️ Tech Stack</span>

- **Framework**: Next.js 14 with App Router
- **UI Library**: Shadcn UI
- **State Management**: Zustand
- **next-themes** – Theme toggling for dark/light mode.
- **lucide-react** – Icon library for React.
- **Styling**: Tailwind CSS

## <span id="getting-started"> 🚀 Getting Started </span>

### Prerequisites

- Node.js (v18 or higher)
- Package manager: **npm** or **yarn**
- [Chrome In-built AI](https://developer.chrome.com/docs/ai)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd [project-directory]
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Set up Environment Variables
   - Create a .env.local file and this variables:

```bash
NEXT_PUBLIC_Summarization_API_Token=your_summarization_api_token_here
NEXT_PUBLIC_Translator_API_Token=your_translator_api_token_here
NEXT_PUBLIC_Language_Detector_API_Token=your_language_detector_api_token_here
```

Replace the placeholder values with your actual API tokens.

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## <span id="project-structure">📂 Project Structure</span>

```plaintext
ticket-booking-app/
├── public/
|   |
│   └── favicon.ico          # Favicon
|
├── src/
|   └── app/                 # Next.js app router
│        ├── page.jsx        # Homepage
│        ├── favicon.ico     # Favicon
│        ├── (home)/         # Homepage Logic
│        └── page.jsx
|
│
├── components/
│   ├── common/              # Reusable components (e.g., Container.jsx,)
│   ├── form/                # Forms
|   |   └── ChatInput/
│   ├── dialog/              # Dialogs
|   |   └── Warning/
│   └── ui/                  # Shadcn components
|
├── store/
│   └── chat.js      # User's bookings store
│
|
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── README.md                # Readme file
├── .env.local               # Environment variables (not committed)
└── package.json             # Project dependencies and scripts
```

## <span id="contributing"> 🤝 Contributing </span>

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## <span id="author"> 👤 Author </span>

- **Tosin Samuel**
- Email: samdevtechnology@gmail.com
- Twitter: [@samdevtech](https://x.com/samdevtech)
- Instagram: [@samdevtech](https://www.instagram.com/samdevtech)
- LinkedIn: [@samdevtech](https://www.linkedin.com/in/sam-dev-bb1654267)

## <span id="acknowledgment"> 🙏 Acknowledgment </span>

- HNG Internship
