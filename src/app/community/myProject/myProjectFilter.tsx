//src/app/community/myProject/MyProjectFilter.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from 'react';
import './myProjectFilter.scss'
import FilterComponent from './components/FilterComponent';
import { myProjectStore } from "./context/myProject";
import { myProjectPostType } from '@/types/datatype'
import SearchIconSVG from '@/essets/searchSub.svg'
import SearchInputSub from '@/components/searchSub/SearchInputSub';

export default function MyProjectFilter() {
  const { setResult, result, originalData, setOriginalData } = myProjectStore();
  const [filteredData, setFilteredData] = useState<myProjectPostType[]>([]);
  const [activeOptions, setActiveOptions] = useState<string[]>([]);
  const [isOnButtonActive, setisOnButtonActive] = useState(false);
  const [keyword, setKeyword] = useState('');
  const filterRef = useRef<HTMLHeadingElement | null>(null);



  // ----------- 필터 클릭 ------------
  const filterToggleBtn: React.MouseEventHandler<HTMLHeadingElement> = () => {
    filterRef.current?.classList.toggle("filterActive");
    setisOnButtonActive(!isOnButtonActive);
  }

  // 클릭한 옵션을 배열로 
  const handleOptionClick = (option: string) => {
    setActiveOptions(prevState => {
      if (prevState.includes(option)) {
        return prevState.filter(opt => opt !== option);
      } else {
        return [...prevState, option];
      }
    });
  }


  // --------------- 필터 시작 ----------------
  function filterData(dataset: myProjectPostType[], filters: string[]) {
    if (!filters.length) {
      return dataset;
    }

    const filteredData = dataset.filter((item) => {
      const memberFilters = filters.some(filter => item.member.includes(filter));
      const stackFilters = filters.some(filter => item.stack.includes(filter));
      return memberFilters || stackFilters;
    });

    return filteredData;
  }

  useEffect(() => {
    setFilteredData(filterData(result, activeOptions));
  }, [activeOptions, result]);

  useEffect(() => {
    setOriginalData(filteredData);
  }, [filteredData]);

  // --------------- 필터 끝 ----------------


  // ---------------- 검색 ------------------
  const inputSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }

  const handleEnterKey = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const filterData = result.filter((item) => {
        for (const value of Object.values(item)) {
          if (typeof value === "string" && value.toLowerCase().includes(keyword.toLowerCase())) {
            return true;
          }
        }
        return false;
      })
      setOriginalData(filterData)
    }
  }


  return (
    <section id="myProjectFilter" className="communityContainer" ref={filterRef}>
      <div className="myProjectFilterHeader">
        <h3 className="filterTitle" onClick={filterToggleBtn}>
          {isOnButtonActive ? '필터 정렬 ∨' : '필터 정렬 ∧'}
        </h3>
        <input type="text"
          className='inputSearch'
          placeholder='2글자 이상 입력해주세용'
          onChange={inputSearch}
          onKeyDown={handleEnterKey} />
        <Image
          src={SearchIconSVG}
          alt="검색 아이콘"
          width={20}
          height={20}
        />
      </div>
      <div className="containerContents">
        <FilterComponent
          sectionName="filterTotalMember"
          title="개발 인원"
          options={['개인', '팀']}
          handleOptionClick={handleOptionClick}
          activeOptions={activeOptions}
        />
        <FilterComponent
          sectionName="filterSkills"
          title="사용 기술"
          options={['HTML', 'CSS', 'JS', 'TS', 'React', 'Vue', 'Nextjs', 'Git']}
          handleOptionClick={handleOptionClick}
          activeOptions={activeOptions}
        />
      </div>
    </section>
  );
}