"use client";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import './mainSlide.scss';

import popularJsonData from '@/data/popular.json';


export default function MainSlide() {
    const [slideNum, setNum] = useState<number>(3.2);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            window.innerWidth < 430 ? setNum(2.2) : setNum(3.2)
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const moveLink = (link: string) => {
        router.push(`https://www.youtube.com/watch?v=${link}`)
    }

    return (
        <section className='contentsBox' id="mainPopularSlide">
            <div className='contLeft'>
                <p className='subtext'>초딩들이 스크랩한</p>
                <h3 className='title'>
                    <span>요즘 인기있는</span> 강의
                </h3>
            </div>
            <Swiper
                slidesPerView={slideNum}
                spaceBetween={18}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                // navigation={true}
                modules={[Autoplay, Navigation, Pagination]}
                className="mySwiper"
                id="mainSlide"
            >
                {
                    popularJsonData.map((item) => {
                        return <SwiperSlide
                            className='contentsFigure'
                            key={item.publishedAt}
                            style={{ backgroundImage: `url(${item.thumbnails.medium.url})` }}
                            onClick={() => { moveLink(item.resourceId.videoId) }}
                        >
                            <div className='innerContents'>
                                <span>#{item.videoOwnerChannelTitle}</span>
                                <h3 className='title'>{item.title}</h3>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </section>
    )
}