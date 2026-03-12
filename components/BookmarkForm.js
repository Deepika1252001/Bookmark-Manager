'use client';

import { useState } from 'react';

export default function BookmarkForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title || !url || !tag) {
      setError('All fields are required');
      return;
    }

    try {
      new URL(url);
    } catch (e) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url, tag }),
      });

      if (!res.ok) throw new Error('Failed to create bookmark');

      const newBookmark = await res.json();
      onAdd(newBookmark);
      setTitle('');
      setUrl('');
      setTag('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Bookmark</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Tag (e.g. Work, Personal)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition disabled:bg-blue-300"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  );
}
