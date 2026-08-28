# ⚙️ Installation Guide

Follow these instructions to get **Career Trade-Offs** running on your local machine for development and testing.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** or **pnpm**
- A **Google Gemini API Key** (for the AI generation feature)
- A **Gmail Account & App Password** (for the feedback email system)

## 1. Clone the Repository
Clone the project to your local machine:
```bash
git clone https://github.com/SidImpact/career-trade-offs.git
cd career-trade-offs
```

## 2. Install Dependencies
Run the following command to install the required Next.js and React packages:
```bash
npm install
```

## 3. Set Up Environment Variables
Create a new file named `.env.local` in the root directory of the project and add the following keys:

```env
# AI Generation API
GEMINI_API_KEY="your_gemini_api_key_here"

# Feedback Email System (Nodemailer)
GMAIL_USER="your_email@gmail.com"
GMAIL_APP_PASSWORD="your_16_digit_app_password"

# Site URL (for SEO and Sitemaps)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```
*(Note: Do not commit your `.env.local` file to version control. It is already included in `.gitignore`.)*

## 4. Run the Development Server
Start the Turbopack development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The application will auto-reload when you save changes.

## 5. Build for Production
To test the production build locally (including SSG generation of all career pages), run:
```bash
npm run build
npm run start
```

## Troubleshooting
- **AI Generation fails:** Ensure your `GEMINI_API_KEY` is valid and has billing/quota available.
- **Feedback emails aren't sending:** Ensure you are using a Google "App Password", not your standard Google account password. You must have 2-Factor Authentication enabled on your Google account to generate an App Password.
