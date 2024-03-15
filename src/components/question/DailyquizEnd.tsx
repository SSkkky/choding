"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import chocho from '@/essets/charactor/CHO.svg';
import { useRouter } from 'next/navigation';
import { useQuestion } from '@/context/questionStore';
import { useSession } from 'next-auth/react';
import { userPointType } from '@/types/user';
import axios from 'axios';




export default function DailyquizEnd({ isCorrect }: any) {

    const router = useRouter();
    const { data: session, status } = useSession();
    const { isOpenFunc } = useQuestion();
    const [mypageData, setMypageData] = useState<userPointType>();

    function quizEndSearch() {
        isOpenFunc({ isOpen: false, isTest: false })
        router.push('/search');
    }



    useEffect(() => {
        async function point() {
            if (isCorrect) {
                const myPointInfo: any = await axios.get(`/api/mypoint?email=${session?.user?.email}`);


                if (!myPointInfo.data.length) {
                    await axios.post('/api/mypoint', { email: session?.user?.email, level: '초딩', point: 1 })
                } else {
                    const myPoint: number = myPointInfo.data[0].point + 1;
                    let levelName = '';

                    if (myPoint <= 5) {
                        levelName = '초딩';
                    } else if (myPoint <= 10) {
                        levelName = '중딩';
                    } else if (myPoint <= 15) {
                        levelName = '고딩';
                    } else if (myPoint <= 20) {
                        levelName = '대딩';
                    } else if (myPoint > 25) {
                        levelName = '직딩';
                    }
                    await axios.put('/api/mypoint', { email: session?.user?.email, level: levelName, point: myPoint })
                }
            }
        }
        point();

    }, [session])



    useEffect(() => {
        axios.get(`/api/mypoint?email=${session?.user?.email}`)
            .then(res => {
                // console.log(res.data)
                if (res !== null) {
                    setMypageData(res.data[0]);
                }
            });
    }, [session])



    return (

        <div className='popUp03'>
            <div className='popUpContents'>
                <div className='popUpContentsC'>
                    <Image
                        src={chocho} alt='chocho'>
                    </Image>
                </div>
                <div className='popUpSubTitle'>

                    {isCorrect ? (
                        <>
                            <div className='valueOOO'>+1</div>
                            <div className='lvBoxOX'>
                                <span>Lv.{mypageData?.level}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='valueXXX'>아쉽네요 :&#40;<br />내일 다시 도전해주세요</div>
                            <div className='lvBoxOX'>
                                <span>Lv.{mypageData?.level}</span>
                            </div>
                        </>
                    )}

                </div>
                <button className='popUpBtn' onClick={quizEndSearch}>
                    공부 하러가기</button>
            </div>
        </div>

    )
}