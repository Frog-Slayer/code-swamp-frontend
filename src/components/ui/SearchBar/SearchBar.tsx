'use client';

import { useState } from "react";
import styles from "./SearchBar.module.css"

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

const SearchBar = ({onSearch, placeholder}: SearchBarProps) => {
    //입력값 변화 감지
    const [query, setQuery] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }
    const handleSearch = () => {
        if (!query.trim()) return;
        onSearch(query);
    };

    return (
        <div>
        <input
            type="search"
            value={query}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
                if (e.key == 'Enter') {
                    handleSearch();
                }
            }}
            placeholder={placeholder}
        ></input>
        </div>
    );
}

export default SearchBar;