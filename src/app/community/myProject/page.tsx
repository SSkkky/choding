"use client";

import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import serverStore from '@/lib/server/serverStore';
import { myProjectPostType } from '@/types/datatype';
import MyProjectFilter from './MyProjectFilter';
import MyProjectTotal from './MyProjectTotal';
import WriteMyProject from './components/WriteButton/WriteMyProject';
import './myProjectMain.scss';
import { myProjectStore } from "./context/myProject";

export default function MyProjectMain() {
  const { setResult, result, setTotalPostId, originalData, setOriginalData } = myProjectStore();

  async function dataCrl(type: string) {
    // 데이터 가져오기 :)
    const res = await serverStore(type, 'myProject');
    if (res !== null) {
      setResult(res.data);
    }
    setOriginalData(result)
  }

  useEffect(() => {
    dataCrl('get')
  }, [])


  return (
    <section id="myProjectMain" className='contPadding'>
      <MyProjectFilter />
      <MyProjectTotal />
      <WriteMyProject />
    </section>
  );
}