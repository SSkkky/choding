"use client";

import { useQuestion } from '@/context/questionStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { userPointType } from '@/types/user';
import axios from 'axios';



export default function DailyquizStart({ startTest }: any) {

    const { quiz, isOpenFunc } = useQuestion();

    const router = useRouter();
    function loginGoGo() {
        isOpenFunc({ isOpen: false, isTest: false })
        router.push('/login');
    }

    const { data: session, status } = useSession();
    const [mypageData, setMypageData] = useState<userPointType>();

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
        <div>
            <div className='popUp04'>
                <div className='popUpContents'>
                    <h3>오늘의 퀴즈</h3>
                    <div className='popUpSubTitle'>

                        {
                            status === 'authenticated' ? (
                                <>
                                    {mypageData?.level ?
                                        (<div className='nameTitle'><span>{session?.user?.name}</span>님<br></br>퀴즈풀고 레벨업 해보세요!</div>) :
                                        (<div className='nameTitle'><span>{session?.user?.name}</span>님<br></br>레벨테스트 후 이용이 가능합니다.</div>)
                                    }
                                </>
                            ) :

                                (<div className='noNameTitle'>로그인 후 이용이 가능합니다.</div>)
                        }

                        <div className='tagBoxOX'>
                            <span>#1포인트</span>
                            <span>레벨업</span>
                        </div>
                    </div>
                    {status === 'authenticated' ? (
                        <>
                            {mypageData?.level ?
                                (<button className='popUpBtn' onClick={() => { startTest(2) }}>오늘의 퀴즈 풀기</button>) :
                                (<button className='popUpBtn' onClick={() => { isOpenFunc({ isOpen: true, isTest: true }) }}>레벨테스트 하러가기 </button>)
                            }

                        </>
                    ) :
                        <button className='popUpBtn' onClick={loginGoGo}>로그인 하러가기</button>


                    }
                </div>
            </div>
        </div>
    )
}