'use client';

import { useState, useEffect } from 'react';
import BookmarkForm from '@/components/BookmarkForm';
import BookmarkList from '@/components/BookmarkList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import EditModal from '@/components/EditModal';

export default function Home() {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    filterBookmarks();
    // Update unique tags whenever bookmarks change
    const uniqueTags = [...new Set(bookmarks.map((b) => b.tag))].sort();
    setTags(uniqueTags);
  }, [bookmarks, selectedTag, searchQuery]);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookmarks');
      if (res.ok) {
        const data = await res.json();
        setBookmarks(data);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBookmarks = () => {
    let filtered = bookmarks;

    if (selectedTag) {
      filtered = filtered.filter((b) => b.tag === selectedTag);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.url.toLowerCase().includes(query)
      );
    }

    setFilteredBookmarks(filtered);
  };

  const handleAddBookmark = (newBookmark) => {
    setBookmarks([newBookmark, ...bookmarks]);
  };

  const handleDeleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const handleUpdateBookmark = (updatedBookmark) => {
    setBookmarks(
      bookmarks.map((b) => (b.id === updatedBookmark.id ? updatedBookmark : b))
    );
  };

  const openEditModal = (bookmark) => {
    setEditingBookmark(bookmark);
  };

  const closeEditModal = () => {
    setEditingBookmark(null);
  };

  return (
    <div className="space-y-8">
      <BookmarkForm onAdd={handleAddBookmark} />

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="md:flex md:items-center md:justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Your Bookmarks</h2>
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <BookmarkList
            bookmarks={filteredBookmarks}
            onDelete={handleDeleteBookmark}
            onUpdate={handleUpdateBookmark}
            onEdit={openEditModal}
          />
        )}
      </div>

      <EditModal
        bookmark={editingBookmark}
        isOpen={!!editingBookmark}
        onClose={closeEditModal}
        onUpdate={handleUpdateBookmark}
      />
    </div>
  );
}
