"use client";
import Image from "next/image";
import SearchIconSVG from '@/essets/searchSub.svg'
import './searchIconSVG.scss'
import { useCallback, ChangeEvent, FormEvent, useState, useEffect } from "react";

interface SearchInputSubType {
    totalSearchFunc: (query: string) => void,
    query: string | null
}

export default function SearchInputSub({ totalSearchFunc, query }: SearchInputSubType) {
    const [keyword, setKeyword] = useState('');

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, []);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedQuery = keyword.trim();
        if (trimmedQuery.length < 3) {
            window.alert('2글자 이상 검색해주세요!')
        } else {
            totalSearchFunc(keyword);
        }
    }, [keyword, totalSearchFunc]);

    return (
        <div id="searchInputSub">
            <Image
                src={SearchIconSVG}
                alt="검색 아이콘"
                width={20}
                height={20}
            />
            <form onSubmit={handleSubmit}>
                <input
                    name="search input form"
                    placeholder="2글자 이상 검색해주세요"
                    type="text"
                    value={keyword}
                    onChange={handleSearchChange}
                />
            </form>
        </div>
    )
}