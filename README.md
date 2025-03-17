# Contest Tracker

A web application that helps you stay updated with the latest competitive programming contests from multiple platforms including Codeforces, LeetCode, and CodeChef.

## Features

- Real-time tracking of programming contests
- Filter contests by platform
- Search functionality for contests
- Status indicators (Upcoming, Ongoing, Completed)
- Clean and responsive UI
- Platform-specific color schemes
- Direct links to contest pages

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [Shad CN](https://https://ui.shadcn.com/) - UI Components

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/contest-tracker.git
cd contest-tracker-
```

2. Install dependencies :

```bash
npm install
```

# or

```bash
yarn install
```

# or

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

# or

```bash
yarn run dev
```

# or

```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│ ├── api/
│ ├── types/
│ └── page.tsx
├── components/
│ ├── ui/
│ └── ...
└── lib/ # Utility functions
```

## API Routes

The application includes API routes for fetching contest data from different platforms:

- `/api/codeforces` - Fetches contests from Codeforces
- `/api/leetcode` - Fetches contests from LeetCode
- `/api/codechef` - Fetches contests from CodeChef

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Integrations 
- YT Links to solutions of contest problems.
- Scheduled Emails for contests
- Dark/Light Mode
- Support for other platforms like HackerRank,AtCoder
