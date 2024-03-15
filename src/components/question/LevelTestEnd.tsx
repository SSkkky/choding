"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import chocho from '@/essets/charactor/CHO.svg';
import { useRouter } from 'next/navigation'
import { useQuestion } from '@/context/questionStore';
import { useSession } from 'next-auth/react';
import { userPointType } from '@/types/user';
import axios from 'axios';


export default function LevelTestEnd({ score }: any) {

    const router = useRouter();
    const { data: session, status } = useSession();
    const { isOpenFunc } = useQuestion();

    function quizEndLogin() {
        isOpenFunc({ isOpen: false, isTest: false })
        router.push('/login');
    }

    function quizEndSearch() {
        isOpenFunc({ isOpen: false, isTest: false })
        router.push('/search');
    }


    useEffect(() => {
        if (!session) return; //비회원이면 데이터저장X
        async function updateLevel() {
            const myPointInfo: any = await axios.get(`/api/mypoint?email=${session?.user?.email}`);
            if (score) {
                let level = '';
                if (score <= 5) {
                    level = '초딩';
                } else if (score <= 10) {
                    level = '중딩';
                } else if (score <= 15) {
                    level = '고딩';
                } else if (score <= 20) {
                    level = '대딩';
                } else if (score > 25) {
                    level = '직딩';
                }

                if (!myPointInfo.data.length) {
                    await axios.post('/api/mypoint', { email: session?.user?.email, level: level, point: score })
                }
                // else {
                //     await axios.put('/api/mypoint', { email: session?.user?.email, level: level, point: score })
                // }

            }
        }

        updateLevel();
    }, [score, session]);



    return (
        <div className='popUp03B'>
            <div className='popUp03'>
                <div className='popUpContents'>
                    <div className='popUpContentsC'>
                        <Image
                            src={chocho} alt='chocho'>
                        </Image>
                    </div>
                    <div className='popUpSubTitle'>

                        {status === 'authenticated' ?

                            <div className='scoreBox'>
                                <span>{session?.user?.name}</span>님의<br></br>총 점수는 <span>{score}</span>점 입니다.</div> :

                            <div className='noNameTitle'>로그인 시<br></br>다양한 강의 정보를 추천해드립니다.</div>}


                        <div className='lvBox'>
                            {/* <span>Lv.{levelValue()}</span> */}
                        </div>

                    </div>

                    {status === 'authenticated' ?
                        <button className='popUpBtn' onClick={quizEndSearch}>
                            공부 하러가기</button>
                        :
                        <button className='popUpBtn' onClick={quizEndLogin}>
                            로그인 하러가기</button>
                    }

                </div>
            </div>
        </div>
    )
}