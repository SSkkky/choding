"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './MyProjectSlide.scss';
import { useCallback } from 'react';

export default function MyProjectSlide({ slidePost }: any) {
    const router = useRouter();

    const handleClickBestFigure = (i: number) => {
        router.push(`/community/myProject/${i}`);
    }

    return (
        <Swiper
            slidesPerView={1}
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
            className="mySwiper ccitem"
            id="mainSlide"
        >
            {
                slidePost && slidePost.map((item: any, i: any) => {
                    return <SwiperSlide
                        className='contentsFigure'
                        key={item.postId}
                        onClick={() => { handleClickBestFigure(item.postId) }}>
                        <figure className='innerContents'>
                            {item.image !== null ? <img src={item.image}></img> : <div className='noImage'>이미지가 없습니다</div>}
                            <figcaption>
                                <h3 className='title'>{item.title}</h3>
                                <div className="bottom">
                                    <span>by {item.name}</span>
                                    <span className='like'>♥ {item.like.length}</span>
                                    <span>💬 {item.comments.length}</span>
                                </div>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                })
            }
        </Swiper>
    )
}