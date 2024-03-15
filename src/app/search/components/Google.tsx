// src/app/search/components/Google.tsx
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { googleSearchItem } from '@/types/datatype';
import ContentsFigure from '@/app/components/ContentsFigure';

interface googleSearchType {
  query: string | null
}

export default function Google({ query }: googleSearchType) {
  const [result, setResult] = useState<googleSearchItem[]>();

  useEffect(() => {
    if (query !== null) {
      const queryTrim = query.trim();
      if (queryTrim !== '' || queryTrim.length > 2) {
        search();
      }
    }
  }, [query])

  const search = async () => {
    await axios.get('/api/google', { params: { q: query } })
      .then(response => {
        setResult(response.data.items);
      })
      .catch(error => {
        // console.error('Error fetching data', error);
      })
  };

  // useEffect(() => { //검색결과 콘솔
  //   console.log(result);
  // }, [result]);

  return (
    <section id="totalSearchGoogleSection" className='innerResults'>
      <ContentsFigure
        result={result}
        option={1}
      />
    </section>
  );
}