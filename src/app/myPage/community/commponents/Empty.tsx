"use client";

import '../../mypage.scss';
import Image from 'next/image';
import empty from '@/essets/empty.svg';
import { useRouter } from 'next/navigation';


export default function MyCommunityEmpty() {

    const router = useRouter();
    const projectWriteGo = () => {
        router.push('/community/myProject/write');
    }

    return (
        <div className='commuEmpty'>

            <Image src={empty} alt='empty'></Image>
            <p>작성한 글이 없습니다.</p>
            <div onClick={projectWriteGo}>프로젝트 작성하기</div>
        </div>
    )
}