"use client";

import '../../mypage.scss';
import Image from 'next/image';
import empty from '@/essets/empty.svg';


export default function MyStudyEmpty() {
    return (
        <div className='studyEmpty'>

            <Image src={empty} alt='empty'></Image>
            <p>책갈피 내역이 없습니다.</p>
            <div>강의 둘러보기</div>
        </div>
    )
}