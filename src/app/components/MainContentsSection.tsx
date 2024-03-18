"use client";
import { useSession } from 'next-auth/react';
import './mainContentsSection.scss'
import Image from 'next/image';
import ArrowRight from '@/essets/arrowRight.svg';
import ContentsFigure from './ContentsFigure';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { levelDataYoutube, googleSearchItem, naverSearchItem } from '@/types/datatype';

type HomeType = {
    subtext: string,
    title: string,
    option: number,
    result: levelDataYoutube[] | googleSearchItem[] | naverSearchItem[] | undefined;
}

export default function Home({ subtext, title, option, result }: HomeType) {
    const router = useRouter();
    const classname = `num${option}`;

    const clickMore = (t: string) => {
        router.push(`http://localhost:3000/search?key=${t}`)
    }

    return (
        <section className={`contentsBox ${classname}`}>
            <div className='contLeft'>
                <p className='subtext'>{subtext}</p>
                <h3 className='title'>
                    {option === 4 ? '초보들의 ' : null}
                    <span>{title}</span>
                    {option === 4 ? null : ' 강의'}
                </h3>
                {
                    option !== 4
                        ? <div className='moreCont'>
                            <button className='more' onClick={() => { clickMore(title) }}>더보기
                        <Image
                            src={ArrowRight}
                            alt='arrow image'
                            width={20} height={20}
                        />
                        </button>
                    </div>
                    : null
                }
            </div>
            <div className="contRight">
                <ContentsFigure
                    result={result}
                    option={option}
                />
            </div>
        </section>
    )
}