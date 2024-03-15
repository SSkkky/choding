"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/essets/LOGO.svg';
import Menu from '@/essets/menu.svg';
import User from '@/essets/user.svg';
import HeaderMenu from './components/HeaderMenu';
import { useSession } from 'next-auth/react';

import './header.scss';

export default function Header() {
    const [active, setActive] = useState(false);
    const { data: session, status } = useSession();

    const onClickMenu: React.MouseEventHandler<HTMLImageElement> = () => {
        setActive(!active);
    }

    return (
        <header id="mainHeader">
            <HeaderMenu setActive={setActive} active={active} onClickMenu={onClickMenu} />
            <div className='headerTOP'>
                <div className='leftSide'>
                    <Image src={Menu}
                        alt='Logo'
                        width={20}
                        height={20}
                        onClick={onClickMenu} />
                </div>
                <h1 className='titleLogo'>
                    <Link href='/' className='logo'>
                        <Image src={Logo} alt='Logo' width={50} height={25}></Image>
                    </Link>
                </h1>
                <div className='rightSide'>

                    {status === 'authenticated' ?
                        <Link href='/myPage' className='signUp'>
                            <Image src={User} alt='Logo' width={50} height={25}></Image>
                        </Link>
                        :
                        <Link href='/login' className='signUp'>
                            <Image src={User} alt='Logo' width={50} height={25}></Image>
                        </Link>
                    }

                </div>
            </div>
        </header>
    );
}