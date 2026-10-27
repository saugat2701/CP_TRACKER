import React from "react";

const COMMON_TOPICS = [
  "All",
  "Arrays",
  "Strings",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Dynamic Programming",
  "Trees",
  "Graphs",
  "Greedy",
  "Math",
  "Stack / Queue",
  "Heap / Priority Queue",
  "Backtracking",
  "Bit Manipulation",
];

export default function FilterBar({ filters, setFilters, onReset }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-toolbar">
      <div className="filter-row-top">
        {/* Search input */}
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            name="search"
            className="search-input"
            placeholder="Search problems by title, topic, or tags..."
            value={filters.search || ""}
            onChange={handleInputChange}
          />
        </div>

        {/* Reset button */}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onReset}
          title="Reset all search and filter criteria"
        >
          🔄 Reset Filters
        </button>
      </div>

      <div className="filter-row-selectors">
        {/* Platform filter */}
        <select
          name="platform"
          className="select-custom"
          value={filters.platform || "All"}
          onChange={handleInputChange}
        >
          <option value="All">Platform: All</option>
          <option value="LeetCode">LeetCode</option>
          <option value="Codeforces">Codeforces</option>
        </select>

        {/* Difficulty filter */}
        <select
          name="difficulty"
          className="select-custom"
          value={filters.difficulty || "All"}
          onChange={handleInputChange}
        >
          <option value="All">Difficulty: All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Status filter */}
        <select
          name="status"
          className="select-custom"
          value={filters.status || "All"}
          onChange={handleInputChange}
        >
          <option value="All">Status: All</option>
          <option value="Solved">Solved</option>
          <option value="Attempted">Attempted</option>
          <option value="Bookmarked">Bookmarked</option>
        </select>

        {/* Topic filter */}
        <select
          name="topic"
          className="select-custom"
          value={filters.topic || "All"}
          onChange={handleInputChange}
        >
          {COMMON_TOPICS.map((t) => (
            <option key={t} value={t}>
              Topic: {t}
            </option>
          ))}
        </select>

        {/* Sort by */}
        <select
          name="sortBy"
          className="select-custom"
          value={filters.sortBy || "createdAt"}
          onChange={handleInputChange}
        >
          <option value="createdAt">Sort: Date Added</option>
          <option value="title">Sort: Problem Title</option>
          <option value="difficulty">Sort: Difficulty</option>
          <option value="revisionDate">Sort: Revision Date</option>
        </select>

        {/* Sort Order */}
        <select
          name="order"
          className="select-custom"
          value={filters.order || "desc"}
          onChange={handleInputChange}
        >
          <option value="desc">Descending ↓</option>
          <option value="asc">Ascending ↑</option>
        </select>
      </div>
    </div>
  );
}
