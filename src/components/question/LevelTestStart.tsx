"use client";

import { useQuestion } from '@/context/questionStore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userPointType } from '@/types/user';
import axios from 'axios';


export default function LevelTestStart({ startTest }: any) {

    const { data: session, status } = useSession();
    const [mypageData, setMypageData] = useState<userPointType>();
    const { quiz, isOpenFunc } = useQuestion();
    const [isOpen, setIsOpen] = useState(false);


    const router = useRouter();
    function mypageGoGo() {
        isOpenFunc({ isOpen: false, isTest: false })
        router.push('/myPage');
    }



    useEffect(() => {

        axios.get(`/api/mypoint?email=${session?.user?.email}`)
            .then(res => {
                // console.log(res.data)
                if (res !== null) {
                    setMypageData(res.data[0]);
                }
            });

    }, [session])


    function handleClose() { //로컬스토리지 하루동안 안열림
        isOpenFunc({ isOpen: false, isTest: false })
        localStorage.setItem('popupClosedTime', String(new Date().getTime()));
    }

    //팝업 시간계산
    useEffect(() => {
        const lastClosedTime = localStorage.getItem('popupClosedTime');
        if (lastClosedTime) {
            const oneDay = 24 * 60 * 60 * 1000; // milliseconds
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - Number(lastClosedTime);
            if (timeDifference < oneDay) {
                isOpenFunc({ isOpen: false, isTest: false })
            } else {
                isOpenFunc({ isOpen: true, isTest: true })
            }
        } else {
            isOpenFunc({ isOpen: true, isTest: true })
        }
    }, []);




    return (
        <>
            <div className='popUp01'>
                <div className='popUpContents'>
                    <h3>레벨 테스트</h3>
                    <div className='popUpSubTitle'>

                        {status === 'authenticated' ? (
                            <>
                                {mypageData?.level ?
                                    (<div className='nameTitle'><span>{session?.user?.name}</span>님은 레벨테스트가<br></br>완료 되었어요</div>)
                                    :
                                    (<div className='nameTitle'><span>{session?.user?.name}</span>님에게 더 잘 맞는<br></br>강의를 추천해 드릴께요</div>)
                                }
                            </>

                        ) : (
                            <div className='noNameTitle'>회원가입하면<br></br>맞춤 강의를 추천해드려요!</div>
                        )}

                        <div className='tagBox'>
                            <span>#10초</span>
                            <span>#OX퀴즈</span>
                        </div>
                    </div>

                    {mypageData?.level ?
                        <button className='popUpBtn' onClick={mypageGoGo}>내 레벨 확인하기</button>
                        :
                        <button className='popUpBtn' onClick={() => { startTest(2) }}>테스트 시작하기</button>
                    }

                </div>
            </div>

            <label className='popUpCloseBtn' onClick={handleClose}>
                하루동안 열지 않기
            </label>
        </>
    )
}