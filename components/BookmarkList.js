'use client';

import BookmarkCard from './BookmarkCard';

export default function BookmarkList({ bookmarks, onDelete, onUpdate, onEdit }) {
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500">No bookmarks found. Start by adding one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
