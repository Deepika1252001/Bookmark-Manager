'use client';

import { Star, Trash2, Edit2, ExternalLink } from 'lucide-react';

export default function BookmarkCard({ bookmark, onDelete, onUpdate, onEdit }) {
  const toggleFavorite = async () => {
    try {
      const res = await fetch(`/api/bookmarks/${bookmark.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookmark, favorite: !bookmark.favorite }),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdate(updated);
      }
    } catch (error) {
      console.error('Failed to toggle favorite', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      try {
        const res = await fetch(`/api/bookmarks/${bookmark.id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          onDelete(bookmark.id);
        }
      } catch (error) {
        console.error('Failed to delete bookmark', error);
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-900 truncate flex-1 mr-2" title={bookmark.title}>
          {bookmark.title}
        </h3>
        <button
          onClick={toggleFavorite}
          className={`p-1 rounded-full transition ${
            bookmark.favorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
          }`}
        >
          <Star size={20} fill={bookmark.favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-sm mb-4 flex items-center gap-1 truncate"
      >
        <ExternalLink size={14} />
        {bookmark.url}
      </a>

      <div className="flex justify-between items-center mt-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
          {bookmark.tag}
        </span>
        <div className="flex gap-2 text-gray-400">
          <button
            onClick={() => onEdit(bookmark)}
            className="hover:text-blue-500 transition"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="hover:text-red-500 transition"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
