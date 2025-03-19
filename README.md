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
- Dark/Light mode toggle
- Bookmark favorite contests
- YouTube solution links for contests

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [Shadcn UI](https://ui.shadcn.com/) - UI Components
- [MongoDB](https://www.mongodb.com/) - Database
- [Zod](https://zod.dev/) - Schema validation

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/contest-tracker.git
cd contest-tracker
```

2. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

or

```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_youtube_api_key
CODECHEF_PLAYLIST_ID=your_codechef_playlist_id
LEETCODE_PLAYLIST_ID=your_leetcode_playlist_id
CODEFORCES_PLAYLIST_ID=your_codeforces_playlist_id
```

4. Run the development server:

```bash
npm run dev
```

or

```bash
yarn run dev
```

or

```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── bookmark/
│   │   ├── codechef/
│   │   ├── codeforces/
│   │   ├── contests/
│   │   ├── leetcode/
│   │   └── youtube/
│   ├── form/
│   ├── types/
│   └── page.tsx
├── components/
│   ├── ui/
│   └── ...
└── lib/ # Utility functions
```

## API Routes

The application includes API routes for fetching and managing data:

- `/api/codeforces` - Fetches contests from Codeforces
- `/api/leetcode` - Fetches contests from LeetCode
- `/api/codechef` - Fetches contests from CodeChef
- `/api/contests` - Fetches contests from all platforms
- `/api/bookmark` - Manages bookmarked contests
- `/api/youtube` - Manages YouTube solution links

## Types

The application uses TypeScript for type safety. Key types include:

```typescript
interface Contest {
  id: string | number;
  name: string;
  platform: string;
  startTime: string;
  duration: string;
  status: string;
  href: string;
}

interface CodeForcesContests {
  id: number;
  name: string;
  phase: string;
  startTimeSeconds: number;
  durationSeconds: number;
}

interface CodeChefContest {
  contest_code: string;
  contest_name: string;
  contest_start_date_iso: string;
  contest_duration: string;
}


type Theme = "dark" | "light";

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface FormValues {
  youtubeUrl: string;
  contestId: string;
}
```

## Features in Detail

### Contest Filtering
Filter contests by platform (Codeforces, LeetCode, CodeChef) or view all contests at once.

### Bookmarks
Save your favorite contests for quick access.

### YouTube Solutions
View solution videos for contests or upload your own YouTube links to share with the community.

### Dark/Light Mode
Toggle between dark and light themes based on your preference.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Integrations 
- Scheduled Emails for contests
- Support for other platforms like HackerRank, AtCoder
- User authentication and profiles
- Contest reminders and notifications
