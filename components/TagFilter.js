'use client';

export default function TagFilter({ tags, selectedTag, onSelectTag }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 items-center">
      <span className="text-sm font-medium text-gray-700 mr-2">Filter by tag:</span>
      <button
        onClick={() => onSelectTag('')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition ${
          selectedTag === ''
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            selectedTag === tag
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
