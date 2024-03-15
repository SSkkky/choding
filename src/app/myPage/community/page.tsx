"use client";

{/* 마이페이지 / 커뮤니티 */ }
import '../mypage.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import arrowLeftGrayDark from '@/essets/arrowLeftGrayDark.svg';
import MyCommunityContents from './commponents/Contents';

export default function MyCommunity() {

    const router = useRouter();

    // 뒤로가기
    const onClickBackHandler = () => {
        router.back();
    }

    return (

        <section className='commuPage'>
            <div className='commuTitle'>
                <p className='backIcon' onClick={onClickBackHandler}>
                    <Image src={arrowLeftGrayDark} alt='arrowLeft' />
                </p>
                <h3>커뮤니티</h3>
            </div>
            <MyCommunityContents />
        </section>

    );
}