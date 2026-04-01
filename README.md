# DubaPost 📸

Turn your plain text, quotes, code snippets, and ideas into beautiful, image-based social media posts in seconds! DubaPost is an open-source React application built to make sharing highly visual and engaging text content an absolute breeze.

## ✨ Features

- **Multiple Content Types**:
  - 📝 **Text**: Share plain text with stunning typographic layouts.
  - 💬 **Quote**: Attribute famous sayings with stylish author formatting.
  - 📖 **Bible Verses**: Beautifully stage scriptural text and its reference.
  - 💻 **Code Snippets**: Highlight code with beautiful themes (dracula, atom, etc.) and Mac-like window frames.
  - 📱 **Social Media Cards**: Simulate posts from platforms like LinkedIn, Twitter, Instagram, and Facebook.
  
- **Limitless Customizations**:
  - Over a dozen aspect ratios perfect for any platform (Instagram 1:1, Facebook Landscape, Twitter, Stories).
  - Clean font selection (including system defaults, serif, and sans-serif options).
  - Background choices ranging from solid colors to beautiful preset gradients.
  - Integration with high-quality unsplash nature/spiritual backgrounds + custom image upload capabilities.

- **High-Quality Export**:
  - Instant canvas rendering and HD PNG downloads powered by `html-to-image`.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with [pnpm](https://pnpm.io/) (the project currently uses pnpm).

### Installation

1. Clone or download the repository to your local machine.
2. Navigate into the project folder:
   ```bash
   cd postgen
   ```
3. Install the specific dependencies:
   ```bash
   pnpm install
   ```

### Running Locally

To start the local Vite development server:

```bash
pnpm run dev
```
Once it compiles, click the localhost link (usually `http://localhost:3000` or `http://localhost:5173`) in your terminal to view the application in your browser.

## 🛠️ How to Use the App

1. **Launch the Editor**: On the landing page, click the **"START CREATING"** button to jump into the editor view. You can also directly navigate to `/editor`.
2. **Select Content Type**: Use the left sidebar to pick what kind of content you want to generate.
3. **Draft Context**: Fill out the provided text areas, configure code languages, or upload an avatar for a social media mock-up.
4. **Style the Design**: Scroll down the left panel to change typography, slide the font size, pick an aspect ratio, and toggle the background visuals to your specific liking.
5. **Download**: Once your preview on the right looks flawless, click the **Download** button in the top right corner. The app will immediately generate and download a sharp PNG image to your local machine.

## 💻 Tech Stack
- React 19
- Vite
- Tailwind CSS v4
- Lucide React (Icons)
- React Syntax Highlighter (Code highlights)
- HTML-to-Image (Canvas rendering)

## 📄 License

Copyright © DubaPost. All rights reserved.
