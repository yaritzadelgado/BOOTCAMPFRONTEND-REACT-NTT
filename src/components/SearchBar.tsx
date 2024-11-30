import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onCategoryChange }) => {
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Buscar productos..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
      />
      <select onChange={(e: ChangeEvent<HTMLSelectElement>) => onCategoryChange(e.target.value)}>
        <option value="all">All categories</option>
        <option value="beauty">Beauty</option>
        <option value="furniture">furniture</option>
        <option value="groceries">groceries</option>
        <option value="fragrances">fragrances</option>
       
        {}
      </select>
    </section>
  );
};
