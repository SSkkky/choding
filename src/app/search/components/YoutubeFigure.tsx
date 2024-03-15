"use client"

import { youtubeSnippet } from '@/types/datatype';
import Image from 'next/image';
import './YoutubeFigure.scss'
import { useEffect, useState } from 'react';
import study from '@/essets/study.png';
import studyChecked from '@/essets/studychecked.png';
import axios from 'axios';
import swal from 'sweetalert';
import { useSession } from 'next-auth/react';

interface youtubeFigureType {
    result: youtubeSnippet[]
}

export default function YoutubeFigure({ result }: youtubeFigureType) {
    const [studyStates, setStudyStates] = useState<Record<string, boolean>>({});
    const [studyData, setStudyData] = useState<any[]>([]);
    const [data, setData] = useState([])
    const { data: session, status } = useSession();
    const [bookMarkId, setBookMarkId] = useState(0);

    const findeBookMarkId = (data: any) => {
        const maxBookMarkId = data.reduce((max: any, item: any) => {
            return item.bookMarkId > max ? item.bookMarkId : max;
        }, Infinity);

        return maxBookMarkId;
    };

    const maxBookMarkId = findeBookMarkId(data);

    useEffect(() => {
        const fetchData = async () => {
            const aaa = await axios.get('/api/bookmark?colName=myStudy')
            setData(aaa.data);
            return;
        }

        fetchData();
    }, [])

    const bookMarkIdCounter = () => {
        const bookMarkId = maxBookMarkId + 1;
        toggleStudyState(bookMarkId, null);
    }


    const toggleStudyState = (videoId: string, bookMarkId: number | null) => {
        setStudyStates(prev => ({ ...prev, [videoId]: !prev[videoId] }));

        if (!session?.user?.email) {
            swal('잠깐!', '로그인 후 이용해주세요', 'warning');
            return;
        }

        const desiredVideo = videoId;
        const study = result.find(item => item.resourceId.videoId === desiredVideo)
        const email = session.user.email;
        setStudyData(prevData => [...prevData, study])

        const data = { email, study, bookMarkId }

        axios.post('/api/bookmark', data)
    }

    if (result.length < 1) {
        return <div>검색 결과가 없습니다!</div>
    }


    return (
        result && result.filter((item, i) => i < 6).map((item, i) => ( // 최대 6개까지만 출력!!!
            <figure className='contentsFigure' key={item.resourceId.videoId}>
                <button className='study' onClick={() => toggleStudyState(item.resourceId.videoId, bookMarkId)}>
                    <Image src={studyStates[item.resourceId.videoId] ? studyChecked : study} alt='강의 책갈피 버튼' width="20" height="25" />
                </button>
                <a href={`https://www.youtube.com/watch?v=${item.resourceId.videoId}`} target='_blank'>
                    <img src={item.thumbnails.medium ? item.thumbnails.medium?.url : item.thumbnails.default.url} alt="썸네일 이미지" />
                    <figcaption>
                        <div className='figcaption'>
                            <div className='top'>
                                <p className='title'>{item.title}</p>
                                <p className='description'>{item.description}</p>
                            </div>
                            <span className='author'>{item.videoOwnerChannelTitle}</span>
                        </div>
                    </figcaption>
                </a>
            </figure>
        ))
    );
}
