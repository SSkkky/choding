// src/app/search/components/Naver.tsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { naverSearchItem } from '@/types/datatype';
import ContentsFigure from '@/app/components/ContentsFigure';
import { error } from 'console';


interface naverSearchType {
    query: string | null
}

export default function Naver({ query }: naverSearchType) {

    const [blog, setBlog] = useState<naverSearchItem[] | null>(null);

    useEffect(() => {
        if (query !== null) {
            const queryTrim = query.trim();
            if (queryTrim !== '' || queryTrim.length > 2) {
                search();
            }
        }
    }, [query])

    const search = async () => {
        try {
            const response = await axios.get('/api/naver', { params: { q: query } });
            const items = response.data.items.map((item: any) => ({
                ...item,
                title: item.title.replace(/(<([^>]+)>)/ig, ""),
                description: item.description.replace(/(<([^>]+)>)/ig, "")
            }));
            setBlog(items);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    // useEffect(() => { //검색결과 콘솔
    //     console.log(blog);
    // }, [blog]);


    return (// className="innerResults" == 공통 스타일(search.scss)
        <section id="totalSearchNaverSection" className="innerResults">
            <ContentsFigure
                result={blog as naverSearchItem[]}
                option={2}
            />
        </section>
    )
}

