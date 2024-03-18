"use client";

import '../../mypage.scss';
import Image from 'next/image';
import empty from '@/essets/empty.svg';
import { useRouter } from 'next/navigation';


export default function MyStudyEmpty() {

    const router = useRouter();
    const searchGo = () => {
        router.push('/search');
    }

    return (
        <div className='studyEmpty'>

            <Image src={empty} alt='empty'></Image>
            <p>책갈피 내역이 없습니다.</p>
            <div onClick={searchGo}>강의 검색하기</div>
        </div>
    )
}