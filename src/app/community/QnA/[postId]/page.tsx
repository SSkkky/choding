'use client'

import axios from 'axios';
import './post.scss'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import detailStore from '@/lib/server/detailStore';
import swal from 'sweetalert';
import Image from 'next/image';
import { myQnAType, myQnACommenttype, myQnACommentValue } from '@/types/datatype';
import DetailComment from './detailComment';
import empty from '@/essets/empty.svg';
import dumi from '@/essets/charactor/CHO.svg'

export default function QnADetail({ params }: any) {
    const [data, setData] = useState<myQnAType>();
    const [comments, setComments] = useState<myQnACommentValue[]>([]);
    const [isOnLikeClick, setOnLike] = useState(true);
    const [isOnUpdate, setUpdate] = useState(false);
    const { data: session, status } = useSession();
    const [textareaValue, setTAValue] = useState('');
    const id = params.postId;
    const name = session?.user?.name;
    const email = session?.user?.email;
    const postIds = data?.postId;
    const img = session?.user?.image;
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const thisDay = (month + '월' + day + '일')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formdata: any) => {
        // console.log(formdata)
        const commentText = formdata.comment;
        const comment = {
            field: "comment",
            updateKey: "postId",
            updateValue: postIds,
            updateType: "push",
            value: { commentText, name, email, img, thisDay }
        }


        if (status !== 'authenticated') {
            swal("비회원이시군요?", "로그인 후 댓글을 작성하실 수 있습니다 :)", "warning")
            return
        }
        const res = await detailStore('put', 'qna', comment, postIds)
        await fetchData();

        reset();
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/post?colName=qna`);
            const d = response.data.filter((obj: myQnAType) => obj._id == id)
            const e = d[0].comment

            setData(d);
            setComments(e);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const likedAlready = data?.like?.some(obj => obj.email === session?.user?.email)
    const onClicklikeHandler = async (data: any) => {
        if (!session?.user?.email) {
            swal('잠깐!', '로그인 후 이용해주세요', 'warning');
            return;
        }

        const filtered = data?.[0].like.filter((value: any) => {
            return value.email !== email
        })

        console.log(filtered)

        const updateResult = {
            field: "like",
            updateKey: "postId",
            updateValue: postIds,
            updateType: likedAlready ? 'set' : 'push',
            value: likedAlready ? filtered : { email: email }
        };

        const res = await detailStore('put', 'qna', updateResult, postIds);
        if (res && res.status === 200) {
            await fetchData();
            setOnLike(!isOnLikeClick);
        } else {
            console.error('myProject like error', res);
        }
    }


    const deleteBtn = async (keyword: string, i: number) => {
        const updatedComments = comments.filter((_, index) => index !== i);
        setComments(updatedComments); // 새로운 배열을 상태로 설정

        const setUpdateResult = {
            field: "comment",
            updateKey: "postId",
            updateValue: postIds,
            updateType: "set",
            value: updatedComments
        }

        const res = await detailStore('put', 'qna', setUpdateResult, postIds);
        if (res && res.status === 200) {
            await fetchData();
            if (keyword === 'update') {
                setUpdate(!isOnUpdate)
            }
        } else {
            console.error('--------------삭제 실패!!!', res);
        }
    }

    return (
        <>
            {
                data && (<div className="postMain">
                    <div className="postContainer">
                        <p>{data.userName}</p>
                        <div className="postDetail">
                            <p dangerouslySetInnerHTML={{ __html: data.content }}></p>
                        </div>
                    </div>
                    <button
                        type='button'
                        onClick={() => { onClicklikeHandler(data.postId) }}
                        className={isOnLikeClick && likedAlready ? 'active like' : 'like'}>
                        <p>♥ <span>{data?.like?.length}</span></p>
                    </button>
                    <form action="" className='postForm' onSubmit={handleSubmit(onSubmit)}>
                        {
                            comments && (
                                <>
                                    <div className='commentLength'>{comments.length}개의 댓글</div>
                                </>
                            )
                        }
                        <textarea {...register('comment', { required: true })} placeholder='여러분들의 소중한 의견을 부탁드립니다!' />
                        <div className='qnapostBtn'>
                            <button type='submit'>댓글 작성</button>
                        </div>
                    </form>
                </div>
                )
            }
            <div className='commentContainer'>
                {
                    comments.map((comment, index) => (
                        <article key={index} className='commentbox'>
                            <div className='commentinfo'>
                                <Image src={comment.img || dumi} alt='' width={90} height={50} />
                                <p>{comment.name}</p>
                            </div>
                            <div className='textbox'>
                                <p className='commentText'>{comment.commentText}</p>
                                <p>{comment.thisDay}</p>
                            </div>
                            <div className='commentsDeleteBtn'
                                style={{ display: session?.user?.email === comment.email ? 'flex' : 'none' }}
                            >
                                <button
                                    type='button'
                                    onClick={() => { deleteBtn('delete', index) }}
                                >삭제</button>
                            </div>
                        </article>
                    ))
                }
            </div>


        </>
    );
}