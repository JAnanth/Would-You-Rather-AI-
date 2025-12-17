# Would You Rather? - AI-Powered Dilemma Generator

An engaging web application that generates thought-provoking "Would You Rather?" questions with AI-powered consequence analysis. Users face difficult choices, see the implications of each option, and can vote/share their decisions.

![Would You Rather Screenshot](https://img.shields.io/badge/Status-Active-success)
![Built with React](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue)
![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-purple)

## Features

- 🎲 **AI-Generated Questions**: Every question is unique and thought-provoking
- 🎯 **Multiple Categories**: Career, Relationships, Superpowers, Money, Ethics, Lifestyle, and Random
- ⚡ **Consequence Analysis**: See the real implications of your choice
- 📊 **Vote Statistics**: Compare your choice with others
- 🎨 **Beautiful UI**: Clean, modern design with smooth animations
- 📱 **Responsive**: Works perfectly on desktop and mobile
- 🔄 **Share Options**: Share your choices on Twitter or copy to clipboard

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (Sonnet 4)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Would-You-Rather-AI-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Anthropic API key:
   ```
   VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

1. **Select a Category**: Choose from Career, Relationships, Superpowers, Money, Ethics, Lifestyle, or Random
2. **Read the Question**: Two options will be presented, each with significant tradeoffs
3. **Make Your Choice**: Click on Option A or Option B
4. **See Consequences**: Read the detailed implications of your choice
5. **View Statistics**: See how your choice compares to others
6. **Share**: Share your choice on Twitter or copy it to clipboard
7. **Generate New**: Click "Generate New Question" for another dilemma

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── CategorySelector.tsx
│   ├── QuestionCard.tsx
│   ├── OptionCard.tsx
│   ├── ConsequenceReveal.tsx
│   ├── Statistics.tsx
│   ├── ShareButtons.tsx
│   └── LoadingSpinner.tsx
├── context/            # React Context for state management
│   └── QuestionContext.tsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── utils/              # Utility functions
│   ├── aiGenerator.ts
│   ├── localStorage.ts
│   ├── shareUtils.ts
│   └── constants.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Features in Detail

### AI-Powered Question Generation

The app uses Claude AI to generate unique, thought-provoking questions. Each question includes:
- Two complex options with real tradeoffs
- Detailed consequence analysis for each option
- Category-specific scenarios

### Category System

7 distinct categories ensure variety:
- 🎲 **Random**: Surprise questions from any category
- 💼 **Career**: Professional dilemmas
- ❤️ **Relationships**: Personal connections
- ⚡ **Superpowers**: Hypothetical abilities
- 💰 **Money**: Financial choices
- ⚖️ **Ethics**: Moral dilemmas
- 🌟 **Lifestyle**: Daily life choices

### Vote Tracking

- Votes are stored in localStorage
- Statistics show percentage split between options
- Visual bar charts for easy comparison
- Vote counts persist across sessions

### Sharing

Multiple sharing options:
- **Twitter**: Pre-formatted tweet with your choice
- **Copy to Clipboard**: Formatted text ready to paste anywhere

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service (Vercel, Netlify, etc.).

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |

## Future Enhancements

- Real backend for actual vote tracking across users
- User authentication and profile
- Question history and favorites
- User-submitted questions
- Comments and discussions
- Question of the Day feature
- Dark mode toggle
- More sharing platforms
- Leaderboard of most divisive questions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Powered by [Anthropic Claude AI](https://www.anthropic.com/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Enjoy exploring impossible choices! 🤔**
