"use client";

import '../../mypage.scss';
import serverStore from '@/lib/server/serverStore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { myStudyType } from '@/types/datatype';
import Image from 'next/image';
import study from '@/essets/study.png';
import studyChecked from '@/essets/studychecked.png';
import axios from 'axios';
import swal from 'sweetalert';
import MyStudyEmpty from './Empty';



export default function MyStudyContents() {

    const { data: session, status } = useSession();
    const [studyData, setStudyData] = useState<any[]>([]);
    const [studyStates, setStudyStates] = useState<Record<string, boolean>>({});
    // const [bookMarkId, setBookMarkId] = useState(0);




    useEffect(() => {
        fetchMyStudy();
    }, [session]);


    const fetchMyStudy = async () => { //내 책갈피(myStudy) 불러오기
        try {
            const res = await serverStore('get', 'myStudy', null, null);
            if (res) {
                const getstudy = res.data.filter((obj: myStudyType) => obj.email === session?.user?.email);
                // console.log("====================")
                // console.log(getstudy)
                // console.log("====================")
                setStudyData(getstudy);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    // const toggleStudyState = async (videoId: string, bookMarkId: number) => {
    //     const updatedStudyData = studyData.filter(item => item.resourceId.videoId !== videoId);
    //     setStudyData(updatedStudyData);

    //     try {
    //         await axios.delete(`/api/bookmark?colName=myStudy/${bookMarkId}`);
    //         // 강의 삭제 요청!아 어떻게한는거야
    //         swal("강의가 즐겨찾기에서 삭제되었습니다.", "", "success");
    //     } catch (error) {
    //         console.error('Error deleting study:', error);
    //         swal("강의 삭제 중 오류가 발생했습니다.", "", "error");
    //     }
    // }


    // onClick={() => toggleStudyState(data.study.resourceId.videoId, bookMarkId)}


    // data.study 데이터 확인 console
    // studyData.map((data, i) => (
    //     console.log(data.study)
    // )

    // )

    return (
        <div>
            <div className='studyContents'>
                {studyData.map((data, i) => (
                    <figure className='contentsFigure' key={data.study.resourceId.videoId + i}>
                        <button className='study'>
                            <Image src={studyStates[data.study.resourceId.videoId] ? study : studyChecked} alt='강의 책갈피 버튼' width="20" height="25" />
                        </button>
                        <a href={`https://www.youtube.com/watch?v=${data.study.resourceId.videoId}`} target='_blank'>
                            <img src={data.study.thumbnails.medium ? data.study.thumbnails.medium?.url : data.study.thumbnails.default.url} alt="썸네일 이미지" />
                            <figcaption>
                                <div className='figcaption'>
                                    <div className='top'>
                                        <p className='title'>{data.study.title}</p>
                                        <p className='description'>{data.study.description}</p>
                                    </div>
                                    <span className='author'>{data.study.videoOwnerChannelTitle}</span>
                                </div>
                            </figcaption>
                        </a>
                    </figure>
                ))}
            </div>
            {studyData.length < 1 ? <div><MyStudyEmpty /></div> : <></>}
        </div>
    )
}