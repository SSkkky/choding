//              src/app/page.tsx
//              메인 교육
"use client";
import './home.scss';
import Head from 'next/head';
import axios from 'axios';
import { useQuestion } from '@/context/questionStore';
import { useSession } from 'next-auth/react';
import MainBanner from './components/MainBanner';
import MainContentsSection from './components/MainContentsSection';
import MainSlide from './components/MainSlide';
import { useState, useEffect } from 'react';
import { levelDataType, levelDataYoutube } from '@/types/datatype'
import { userPointType, userDataType } from '@/types/user'
import levelKeyword from '@/data/levelKeyword.json';
import cdData from '@/data/mainContents/cd.json';
import jdData from '@/data/mainContents/jd.json';
import gdData from '@/data/mainContents/gd.json';
import ddData from '@/data/mainContents/dd.json';
import zdData from '@/data/mainContents/zd.json';
import community from '@/data/community.json';


export default function Home() {
  const { quiz, isOpenFunc } = useQuestion();
  const { data: session, status } = useSession();
  const [loginData, setLoginData] = useState<userPointType[] | undefined>();
  const [result, setResult] = useState<levelDataType>();
  const [title, setTitle] = useState<string[]>([]);

  useEffect(() => {
    dataCrl('get');
    if (status !== 'authenticated') {
      setTitle(levelKeyword[0].cd)
      setResult(cdData as levelDataType);
      isOpenFunc({ isOpen: true, isTest: true }); //테스트팝업on

    }
  }, [status])

  useEffect(() => {
    if (status === 'authenticated') {
      // console.log('-----------------session')
      // console.log(session.user)
      loadData()
    }

  }, [loginData])


  // 데이터 가져오기  
  async function dataCrl(type: string) {
    const res = await axios.get(`/api/mongodb?colName=myPoint&email=${session?.user?.email}`);
    if (res !== null) { setLoginData(res.data) }
  }

  const loadData = async () => {
    let nowUser = await loginData?.find(obj => obj.email === session?.user?.email);
    isOpenFunc({ isOpen: false, isTest: false });//테스트팝업off (따닥........)

    if (!nowUser) {
      setTitle(levelKeyword[0].cd)
      setResult(cdData as levelDataType)

      isOpenFunc({ isOpen: true, isTest: true });
      return;
    };

    // console.log('-----------------nowUser')
    // console.log(nowUser)
    // console.log('------------------------')

    switch (nowUser.level) {
      case '초딩':
        setTitle(levelKeyword[0].cd)
        setResult(cdData as levelDataType)
        break;
      case '중딩':
        setTitle(levelKeyword[0].jd)
        setResult(jdData as levelDataType)
        break;
      case '고딩':
        setTitle(levelKeyword[0].gd)
        setResult(gdData as levelDataType)
        break;
      case '대딩':
        setTitle(levelKeyword[0].dd)
        setResult(ddData as levelDataType)
        break;
      case '직딩':
        setTitle(levelKeyword[0].zd)
        setResult(zdData as levelDataType)
        break;
      default:
        setTitle(levelKeyword[0].cd)
        setResult(cdData as levelDataType)
        break;
    }
  }


  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </Head>
      <main className="mainContainer">
        <MainBanner
          title={title}
        />
        <MainSlide />
        <MainContentsSection
          option={0}
          subtext={'동영상으로 차근차근'}
          title={title[0]}
          result={result?.youtube}
        />

        <MainContentsSection
          option={1}
          subtext={'기본부터 쌓아가요'}
          title={title[1]}
          result={result?.google}
        />

        <MainContentsSection
          option={2}
          subtext={'자세히 알아봐요'}
          title={title[2]}
          result={result?.naver}
        />

        <section className="bottomContents">
          <MainContentsSection
            option={4}
            subtext={'모두와 공유해요'}
            title={'커뮤니티'}
            result={community as levelDataYoutube[]}
          />
          <section id="mainTodayQuiz" className="num5">
            <div className='contLeft'>
              <p className='subtext'>열심히 공부했다면?</p>
              <h3 className='title'>오늘의
                <span>&nbsp;퀴즈</span>
              </h3>
            </div>
            <div className="contRight" onClick={() => { isOpenFunc({ isOpen: true, isTest: false }) }}></div>
          </section>
        </section>
      </main>
    </>
  );
}
