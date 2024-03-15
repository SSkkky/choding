"use client";

import serverStore from '@/lib/server/serverStore';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../../mypage.scss';
import Image from 'next/image';
import heart from '@/essets/heart.svg';
import noImage from '@/essets/noImage2.png';
import MyCommunityEmpty from './Empty';
import { myProjectPostType, myQnAType } from '@/types/datatype';
import { userPointType } from '@/types/user';





export default function MyCommunityContents() {

    const router = useRouter();
    const { data: session, status } = useSession();
    const [project, setProject] = useState([]);
    const [qna, setQnA] = useState([]);



    const projectGO = (postId: myProjectPostType) => {
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
        <div className='' >
            {combinedData.map((data, index) => (
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

            {combinedData.length < 1 ? <div><MyCommunityEmpty /></div> : <></>}
        </div>
    )
}