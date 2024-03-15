"use client";

import serverStore from '@/lib/server/serverStore';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './mypage.scss';
import Image from 'next/image';
import Link from 'next/link';
import heart from '@/essets/heart.svg';
import noImage from '@/essets/noImage2.png';
import arrowRight from '@/essets/arrowRight.svg';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuestion } from '@/context/questionStore';
import { myProjectPostType, myQnAType } from '@/types/datatype';
import { userPointType } from '@/types/user';
import MyCommunityContents from './community/commponents/Contents';



export default function MyPage() {
    const { data: session, status } = useSession();
    const myImgStyle = status === 'authenticated' ? { backgroundImage: `url(${session?.user?.image})` } : {}; //유저이미지
    const [randomTitle, setRandomTitle] = useState('');
    const [mypageData, setMypageData] = useState<userPointType>();
    const { isOpenFunc } = useQuestion();
    const router = useRouter();
    const [project, setProject] = useState([]);
    const [qna, setQnA] = useState([]);




    useEffect(() => {
        const title = [
            "스치면 인연, 스며들면 스폰지밥",
            "힘내요! 잘해왔잖아요",
            "Start each day like it's your birthday",
            "오늘은 밝은옷을 입으세요",
            "나는 노동자, 슬픈 내 눈동자",
            "역시 내가 귀여운 탓인가",
            "외출말고 휴식을 취하세요",
            "결과는 기대 이상입니다",
            "기다리던 소식이 찾아와요",
            "오늘의 행운의 색 RED",
            "적게 주고 크게 얻는날",
            "이루지 못할 일은 없어요",
            "미뤄뒀던 계획을 실행하세요",
            "하던 일에 결실이 보이네요!",
            "한 걸음만 양보해보세요"
        ];
        const randomId = Math.floor(Math.random() * title.length);
        setRandomTitle(title[randomId]);
    }, []);



    // console.log(session?.user?.email)
    useEffect(() => {
        axios.get(`/api/mypoint?email=${session?.user?.email}`)
            .then(res => {
                // console.log(res.data)
                if (res !== null) {
                    setMypageData(res.data[0]);
                }
            });
    }, [session])





    const projectGO = (postId: myProjectPostType[]) => {
        router.push(`/community/myProject/${postId}`);
    };

    const qnaGO = (_id: myQnAType) => {
        router.push(`/community/QnA/${_id}`);
    };


    useEffect(() => {
        fetchProject();
        fetchQnA();
    }, [session]);


    const fetchProject = async () => { //내 프로젝트 불러오기
        try {
            const response = await serverStore('get', 'myProject', null, null);
            if (response) {
                const getproject = response.data.filter((obj: myProjectPostType) => obj.email === session?.user?.email);
                // console.log("====================")
                // console.log(getproject)
                // console.log("====================")
                setProject(getproject);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchQnA = async () => { //내 qna 불러오기
        try {
            const response = await serverStore('get', 'qna', null, null);
            if (response) {
                const getqna = response.data.filter((objj: myQnAType) => objj.Email === session?.user?.email);
                // console.log("-------------------")
                // console.log(getqna)
                // console.log("-------------------")
                setQnA(getqna);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const combinedData: any[] = [...project, ...qna]; //project + qna 결과값 합침
    // console.log(combinedData)


    const renderData = (data: myProjectPostType[]) => {
        if ('date' in data) {
            return (
                <span className='myP'>내 프로젝트</span>
            );
        } else {
            return (
                <span className='myQ'>QnA</span>
            );
        }
    };  //project /qna 구별


    combinedData.sort((a, b) => b.postId - a.postId);    // postId 기준 정렬







    return (

        <section className="myPageMain">

            <article className='myPageBack'>
                <article className='myPageTitle'>
                    <div className='myTitle1'>
                        {status === 'authenticated' ? <span>{session?.user?.name}</span> : '비회원'}
                        님 어서오세요!</div>
                    <div className='myTitle2'>
                        {mypageData?.level ?
                            <div>{randomTitle}</div> : <div>레벨테스트하고<br></br> 강의를 추천받으세요!</div>}

                    </div>

                    <div className='myInfo'>
                        <div className='myLv' onClick={() => { isOpenFunc({ isOpen: true, isTest: true }) }}>
                            <p>레벨</p>

                            {mypageData?.level ?
                                <b>{mypageData.level}</b>
                                :
                                <b>?</b>}
                        </div>

                        <div className='myPot'>
                            <p>포인트</p>

                            {mypageData?.point ?
                                <b> {mypageData?.point} </b> : <b>0</b>}
                        </div>

                    </div>
                    <div className='myImg'>
                        <div style={myImgStyle}>
                        </div>
                    </div>
                </article>
            </article>

            <article className='myPageContents'>
                <div className='myTitleFlex'>
                    <h4>내 책갈피</h4>
                    <span>
                        <Link href='myPage/study'>더보기</Link>
                        <Image
                            src={arrowRight} alt='arrowRight'
                            width={20} height={20}>
                        </Image>
                    </span>
                </div>
                <div className='studyThumb'>
                    <figure>
                        <div></div>
                        <figcaption>컨텐츠 타이틀을 ..</figcaption>
                    </figure>

                    <figure>
                        <div></div>
                        <figcaption>컨텐츠 타이틀을 ..</figcaption>
                    </figure>

                    <figure>
                        <div></div>
                        <figcaption>컨텐츠 타이틀을 ..</figcaption>
                    </figure>
                </div>
            </article>

            <article className='myPageContents'>
                <div className='myTitleFlex'>
                    <h4>커뮤니티</h4>
                    <span>
                        <Link href='myPage/community'>더보기</Link>
                        <Image
                            src={arrowRight} alt='arrowRight'
                            width={20} height={20}>
                        </Image>
                    </span>
                </div>
                <div >
                    {combinedData.filter((data, index) => index < 3).map((data, index) => (
                        <div className='commuContents' key={index} >

                            <figure onClick={() => {
                                if ('date' in data) {
                                    projectGO(data.postId);
                                } else {
                                    qnaGO(data._id);
                                }
                            }}>

                                {
                                    data?.image ?
                                        <div>
                                            <Image src={data?.image} alt='이미지' width={90} height={76} />
                                        </div>
                                        :
                                        <div>
                                            <Image src={noImage} alt='이미지' width={0} height={76} objectFit="cover" />
                                        </div>
                                }

                                <figcaption>

                                    <div>{renderData(data)}</div>
                                    <b>{data.title}</b>
                                    <p>{data?.overview ?
                                        data?.overview : ''}</p>

                                </figcaption>
                                <p className='heart'>
                                    <Image src={heart} alt='heart'
                                        width={20} height={20}></Image>
                                    <span>{data?.like.length}</span>
                                </p>
                            </figure>

                        </div>
                    ))}
                </div>
            </article>

            <article className='myPageContents'>
                <div className='myCheck'>
                    <Link href='myPage/check'>출석체크</Link>
                </div>
            </article>
        </section >

    );
}