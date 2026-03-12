# 🔖 Bookmark Manager

A production-ready Bookmark Manager built with Next.js, Prisma, and SQLite.

## 🚀 Features

- **Add Bookmarks**: Save links with title, URL, and tags.
- **List & Grid View**: View all your bookmarks in a clean, responsive layout.
- **Search**: Instantly find bookmarks by title or URL.
- **Filter by Tag**: Organize and filter your collection by custom tags.
- **Favorites**: Mark your most important links as favorites.
- **Edit & Delete**: Easily update or remove bookmarks.
- **Validation**: URL and required field validation on both client and server.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.

## 🛠️ Tech Stack

- **Frontend**: React + Next.js (App Router)
- **Backend**: Next.js API Routes
- **Database**: SQLite
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bookmark-manager
   ```

2. **Set up Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Database Setup**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Folder Structure

```
├── app/
│   ├── api/            # API Routes
│   ├── globals.css     # Global Styles
│   ├── layout.js       # Root Layout
│   └── page.js         # Main Application Page
├── components/         # Reusable React Components
├── lib/                # Shared Utilities (Prisma Client)
├── prisma/             # Prisma Schema & Migrations
├── public/             # Static Assets
└── tailwind.config.js  # Tailwind CSS Configuration
```

## 📝 API Endpoints

- `GET /api/bookmarks` - Get all bookmarks (supports `search` and `tag` query params)
- `POST /api/bookmarks` - Create a new bookmark
- `PUT /api/bookmarks/:id` - Update a bookmark
- `DELETE /api/bookmarks/:id` - Delete a bookmark

## 💡 Git Commit Examples

- `feat: add bookmark creation API`
- `feat: implement bookmark list UI`
- `feat: add tag filtering`
- `fix: validation for URL input`
- `docs: update README`

## 🔮 Future Improvements

- [ ] **Pagination**: Support for large collections of bookmarks.
- [ ] **Analytics**: Track link click counts.
- [ ] **Drag & Drop**: Reorder bookmarks or manage tags via drag and drop.
- [ ] **Dark Mode**: Add support for dark theme.
- [ ] **Authentication**: Allow multiple users to have private collections.
