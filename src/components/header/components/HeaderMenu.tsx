"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/essets/LOGO.svg';
import Menu from '@/essets/menu.svg';
import User from '@/essets/user.svg';
import Close from '@/essets/close.svg';
import ArrowRight from '@/essets/arrowRight.svg';
import ListComponent from './List';
import axios from 'axios';
import { getClientToken } from "@/app/utils/firebaselint";
import { useSession, signOut } from 'next-auth/react';
import './headerMenu.scss';

interface headerMenuType {
    active: boolean,
    setActive: (value: boolean) => void,
    onClickMenu: React.MouseEventHandler
}

export default function HeaderMenu({ active, setActive, onClickMenu }: headerMenuType) {
    const [activeLogin, setActiveLogin] = useState(false);

    const { data: session, status } = useSession();

    useEffect(() => {
        { status === 'authenticated' ? setActiveLogin(true) : setActiveLogin(false) }
    }, [status])

    let loginContStyle = {
        display: status === 'authenticated' ? 'block' : 'none'
    }

    // ------------------------------pwa---------------------------------------

    // 푸시 알림 권한 요청
    const clientPermission = () => {
        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') { alert('푸시 거부됨'); }
            else { alert('푸시 승인됨'); }
        });
    };

    // firebase
    const msgTest = async () => {
        const token = await getClientToken();
        console.log(token)

        const message = {
            data: {
                title: '초딩에서 알려드려요',
                body: '지금 바로 확인해보세요!',
                icon: 'https://firebasestorage.googleapis.com/v0/b/choding.appspot.com/o/writeImg%2FuserDefault.png?alt=media&token=21a6d29c-aa75-4f34-97a4-0935a44fbe2e',
                image: 'https://firebasestorage.googleapis.com/v0/b/choding.appspot.com/o/writeImg%2FLOGO.png?alt=media&token=f544133b-061b-4f71-b56e-07a0ffe54de8',
                click_action: 'https://choding.vercel.app',
            },
            token
        };

        axios({
            method: 'POST',
            url: '/api/firebase',
            data: { message },
        });
    }

    useEffect(() => {
        if ('navigator' in window) {
            navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/firebase-cloud-messaging-push-scope' })
        }
    }, [])

    return (
        <div id="HeaderMenu" className={active ? 'active' : ''}>
            <div className='headerBG'>
                <div className='headerTop'>
                    <button>
                        <Image
                            src={Close}
                            alt='close menu'
                            width={30} height={30}
                            onClick={onClickMenu}
                        ></Image>
                    </button>
                    <div className='loginCont'>
                        {
                            status === 'authenticated'
                                ? <div className='onSessionUser'>
                                    <Image
                                        src={session?.user?.image as string}
                                        alt='프로필 이미지'
                                        width={40}
                                        height={40}
                                        onClick={msgTest}
                                    />
                                    <p style={loginContStyle}>
                                        <span className='userName'>
                                            {session?.user?.name}
                                        </span>님<br />어서오세요!
                                    </p>
                                </div>
                                : <Link href="/login" onClick={onClickMenu}>
                                    <b>로그인 해주세요</b>
                                    <Image
                                        src={ArrowRight}
                                        alt='arrow image'
                                        width={20} height={20}
                                    />
                                </Link>
                        }
                    </div>
                    <ul className='headerMenuGroup'>
                        <li>
                            <h3>교육</h3>
                            <ListComponent
                                options={['홈', '전체 검색', '오늘의 퀴즈']}
                                href={['/', '/search', '/question']}
                                onClickMenu={onClickMenu}
                            />
                        </li>
                        <li>
                            <h3>커뮤니티</h3>
                            <ListComponent
                                options={['홈', 'Q&A', '프로젝트']}
                                href={['/community', '/community/QnA', '/community/myProject']}
                                onClickMenu={onClickMenu}
                            />
                        </li>
                    </ul>
                </div>
                <div className='headerBottom'>
                    {status === 'authenticated' ? <span onClick={() => { signOut() }} className='signUp'>로그아웃</span> : <Link href="/signUp" onClick={onClickMenu} className='signUp'>회원가입</Link>}

                </div>
            </div>
        </div >
    )
}