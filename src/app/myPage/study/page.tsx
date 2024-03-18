"use client";

{/* 마이페이지 / 책갈피 */ }
import '../mypage.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import arrowLeftGrayDark from '@/essets/arrowLeftGrayDark.svg';
import MyStudyEmpty from './commponents/Empty';
import MyStudyContents from './commponents/Contents';


export default function StudyPage() {

    const router = useRouter();

    // 뒤로가기
    const onClickBackHandler = () => {
        router.back();
    }

    return (

        <section className="studyPage">
            <div className='studyTitle'>
                <p className='backIcon' onClick={onClickBackHandler}>
                    <Image src={arrowLeftGrayDark} alt='arrowRight' />
                </p>
                <h3>내 책갈피</h3>
            </div>
            <div className='studyContentsBack'>
                <MyStudyContents />
            </div>
        </section>
    );
}