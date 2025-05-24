'use client';

import { useState } from "react";
import SearchIcon from "./SearchIcon";
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
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <SearchIcon />
            </div>
            <input
                type="search"
                className={styles.input}
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