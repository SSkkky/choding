// 내 프로젝트 리스트
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { myProjectStore } from '@/app/community/myProject/context/myProject';
import { myProjectPostType } from '@/types/datatype';
import './figureComponent.scss';
import { useEffect } from 'react';

export default function FigureComponent() {
    const router = useRouter();
    const { originalData, setOriginalData } = myProjectStore();

    const onClickHandler = async (num: number) => {
        router.push(`/community/myProject/${num}`)
    }

    return (
        <>
            {originalData.map((item) => (
                <figure className='communityFigure'
                    onClick={() => { onClickHandler(item.postId) }}
                    key={item.postId}>
                    {
                        !item.image && (item.image == undefined || item.image.length < 1) ? <div className='noImage'></div> : <img src={item.image} alt={item.title} />
                    }
                    <figcaption>
                        <div className='figcaption'>
                            <div className='top'>
                                <span className='goal'>#{item.goal}</span>
                                <p className='title'>{item.title}</p>
                                <p className='overview'>{item.overview}</p>
                            </div>
                            <div className='bottom'>
                                <div className='sub1'>
                                    <span className='date'>{item.date}</span>
                                    <span className='comments'>댓글 {item.comments.length}</span>
                                </div>
                                <div className='sub2'>
                                    <span className='name'>by {item.name}</span>
                                    <span className='likeNum'>♥ {item.like.length}</span>
                                </div>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            ))
            }
            {originalData.length < 1 ? <div className='myProjectNoData'>데이터가 없어요ㅠ</div> : <></>}
        </>
    );
}
