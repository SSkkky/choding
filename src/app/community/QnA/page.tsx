'use client'

import { useRef, useState } from 'react';
import "./QnA.scss";
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import swal from 'sweetalert';

const AllPage = dynamic(() => import('./allPage'), { ssr: false });
const MyPage = dynamic(() => import('./myPage'), { ssr: false });

export default function QnA() {
    
    const { data: session, status } = useSession();

    const [selectedPage, setSelectedPage] = useState('all'); // 'all' 페이지를 기본값으로 설정

    const handleAllPageClick = () => {
        setSelectedPage('all');
    };

    const handleMyPageClick = () => {
        if (status !== 'authenticated') { // 인증되지 않은 경우 경고창 표시 후 함수 종료
            swal('잠깐!', '로그인 후 이용해주세요', 'warning');
            return;
        }
        setSelectedPage('my');
    };


    return (
        <section id="QnAMain" className="contPadding">
            <div className="QnAHeader">
                <button className={selectedPage === 'all' ? 'active' : ''} onClick={handleAllPageClick}>전체 질문</button>
                <button className={selectedPage === 'my' ? 'active' : ''} onClick={handleMyPageClick}>내 질문</button>
            </div>
            {selectedPage === 'all' && <AllPage />}
            {selectedPage === 'my' && <MyPage />}
        </section>
    );
}

