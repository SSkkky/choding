"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { myProjectCommentType, myProjectCommentValue } from '@/types/datatype';
import detailStore from '@/lib/server/detailStore';
import swal from 'sweetalert';
import './DetailComment.scss'

export default function DetailComment({ result, fetchData }:any) {
  const { data: session, status } = useSession();
  const [isOnUpdate, setUpdate] = useState(false);
  const [textareaValue, setTAValue] = useState('');
  const [clickItemNum, setClickItemNum] = useState(0);

  // 작성일 차이 계산
  dayjs.extend(customParseFormat);
  const now = dayjs();
  dayjs.locale('ko');
  const today = dayjs().format("YYYY년 MM월 DD일");

  const { formState: { errors }, register, watch, setValue, handleSubmit: handleFormSubmit } = useForm<myProjectCommentType>({
    defaultValues: {
      updateKey: 'postId',
      updateValue: result.postId,
      updateType: 'push',
      field: 'comments',
      value: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        comment: '',
        date: today
      }
    },
  });

  const onSubmit = async (data: myProjectCommentType) => {
    if (status !== 'authenticated' || !data.value.email) {
      swal("비회원이시군요?", "로그인 후 댓글을 작성하실 수 있습니다 :)", "warning")
      return
    }
    if (data.value.comment.length < 3) {
      swal("2글자 이상 작성해주세요", "정성 가득한 댓글 부탁드립니다 :)", "warning")
      return
    }

    const res = await detailStore('put', 'myProject', data, result.postId);

    // console.log(res?.status, 'test')

    if (res && res.status === 200) {
      await fetchData();
    } else {
      console.error('DetailComment 54 업데이트 실패...', res);
    }

    setValue('value.comment', '');
  }

  

  // --------------- 삭제, 수정 --------------------
  const commentsOnClick = async (keyword: string, i: number) => {
    const deleteItem = result.comments;
    console.log(deleteItem)
    if (keyword === 'delete') {
      await deleteItem.splice(i, 1);
    } else if (keyword === 'update') {
      deleteItem[i].comment = await textareaValue;
    }

    const setUpdateResult = {
      field: "comments",
      updateKey: "postId",
      updateValue: result.postId,
      updateType: "set",
      value: deleteItem
    }

    const res = await detailStore('put', 'myProject', setUpdateResult, result.postId);
    if (res && res.status === 200) {
      await fetchData();
      if (keyword === 'update') {
        setUpdate(!isOnUpdate)
      }
    } else {
      console.error('--------------삭제 실패!!!', res);
    }
  }

  const onClickUpdate = (i: number) => {
    setUpdate(!isOnUpdate)
    setClickItemNum(i);
  }

  return <section id="myProjectDetailComment">
    <section className='mpdInputComment'>
      <p><b>{result.comments ? result.comments.length : '0'}</b>개의 댓글</p>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <textarea
          placeholder='댓글을 작성해주세요'
          {...register('value.comment', {
            minLength: {
              value: 2,
              message: ''
            }
          })}
        />
        <div className='btnCont'>
          <button type='submit'>댓글 작성</button>
        </div>
      </form>
    </section>

    <section id="DetailComment">
      {
        result.comments.map((item: myProjectCommentValue, i: number) => {
          const itemCreatedDate = dayjs(item.date, 'YYYY년 MM월 DD일');
          if (!itemCreatedDate.isValid()) {
            console.error(`Invalid date format for comment at index ${i}:`, item.date);
            return '0';
          }
          const diffInDaysForItem = now.diff(itemCreatedDate, 'day');

          return <div className='mpdComment' key={i}>
            <section id="mpCommentsProfile">
              <div className='profileCont'>
                <p className='mydUserPic'>
                  {
                    !item.image || item.image == undefined || item.image == null || item.image.length < 1 ? <div className='noImage'></div> : <Image src={item.image} width={36} height={36} alt="user profile" />
                  }
                </p>
                <p className='mydUserId'>{item.name}</p>
                <p className='mydCommentDate'>{diffInDaysForItem}일 전</p>
              </div>
              <div className='functionCont'
                style={{ display: session?.user?.email === item.email ? 'flex' : 'none' }}
              >
                <button type="button"
                  className='update'
                  onClick={() => { onClickUpdate(i) }}
                >{isOnUpdate ? '취소' : '수정'}</button>
                <button type="button"
                  className='delete'
                  onClick={() => { commentsOnClick('delete', i) }}
                >삭제</button>
              </div>
            </section>

            <div className='commentText'>
              <p style={{ display: isOnUpdate && i === clickItemNum ? 'none' : 'block' }}>{item.comment}</p>
              <textarea
                placeholder='댓글을 수정해주세요'
                onChange={(e) => { setTAValue(e.currentTarget.value) }}
                value={textareaValue}
                style={{ display: isOnUpdate && i === clickItemNum ? 'block' : 'none' }}
              />
              <div className='updateBtnCont'>
                <button
                  className='updateComplete'
                  onClick={() => { commentsOnClick('update', i) }}
                  style={{ display: isOnUpdate && i === clickItemNum ? 'flex' : 'none' }}
                >댓글 수정</button>
              </div>
            </div>
          </div>
        })
      }
    </section>
  </section>
}