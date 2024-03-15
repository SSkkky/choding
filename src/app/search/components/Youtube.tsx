"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { youtubeSearch, youtubeSearchItem, youtubeSnippet } from '@/types/datatype';
const YoutubeFigure = dynamic(() => import('@/app/search/components/YoutubeFigure'), { ssr: false });
import youtubeData from '@/data/youtubeSearch.json';

interface youtubeSearchType {
    query: string | null
}

export default function Google({ query }: youtubeSearchType) {
    const [result, setResult] = useState<youtubeSnippet[]>([]);
    let onlyItems: youtubeSnippet[] = [];

    useEffect(() => {
        if (query !== null) {
            const queryTrim = query.trim();
            if (queryTrim !== '' || queryTrim.length > 2) {
                search();
            }
        }
    }, [query])

    const matchesQuery = (item: youtubeSnippet, query: string) => {
        return item.title.includes(query) ||
            item.description.includes(query) ||
            item.channelTitle.includes(query);
    };

    const search = () => {
        getData(); // 데이터를 가져오는 함수
        if (query !== null) {
            const searchResults = onlyItems.filter(item => matchesQuery(item, query));
            setResult(searchResults);
        }
    };


    const getData = () => {
        youtubeData.forEach((item) => { onlyItems.push(...item.items.map((i) => i.snippet as youtubeSnippet)); });
    }

    return (
        <section id="totalSearchGoogleSection" className='innerResults'>
            <YoutubeFigure
                result={result}
            />
        </section>
    );
}