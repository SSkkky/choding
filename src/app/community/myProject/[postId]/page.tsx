"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { myProjectStore } from '@/app/community/myProject/context/myProject';
import detailStore from '@/lib/server/detailStore';
import { myProjectPostType } from '@/types/datatype';
import DetailComment from './DetailComment';
import Share from '@/essets/share.svg';
import Heart from '@/essets/heart.svg';
import './MyProjectDetail.scss'
import swal from 'sweetalert';

export default function MyProjectDetail({ params }: any) {
  const [result, setResult] = useState<myProjectPostType | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  async function fetchData() {
    const res = await detailStore('get', 'myProject', null, params.postId);
    if (res !== null) {
      setResult(res.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // --------------------------------- 수정, 삭제 활성화
  let hearderBottomRight = {
    display: session?.user?.email === result?.email ? 'block' : 'none'
  }

  // --------------------------------- 공유 클릭
  const shareHandler = () => {
    if (result) {
      const url = encodeURIComponent(result.link);
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      window.open(facebookUrl, "_blank");
    }
  }

  // --------------------------------- 좋아요 클릭
  const likedAlready = result?.like.some(obj => obj.email === session?.user?.email);
  const onClicklikeHandler = async (postId: number) => {
    if (!session?.user?.email) {
      swal('잠깐!', '로그인 후 이용해주세요', 'warning');
      return;
    }

    const userEmail = session.user.email;
    const filtered = result?.like.filter((value) => {
      return value.email !== userEmail
    })

    const updateResult = {
      field: "like",
      updateKey: "postId",
      updateValue: result?.postId,
      updateType: likedAlready ? 'set' : 'push',
      value: likedAlready ? filtered : { email: userEmail }
    };

    const res = await detailStore('put', 'myProject', updateResult, result?.postId);
    if (res && res.status === 200) {
      await fetchData();
    } else {
      console.error('myProject like error', res);
    }
  }

    // --------------------------------- 게시글 삭제
  const onClickDeleteHandler = () => {
      swal({
        title: "게시글 삭제",
        text: "정말로 게시글을 삭제하시겠습니까?",
        icon: "warning",
        buttons: {
          cancel: {
            text: '취소',
            visible: true,
            closeModal: true
          },
          confirm: {
            text: '삭제',
            visible: true,
            closeModal: true
          },
        }
      }).then((result) => {
        if (result) {
          detailDelete();
        }
      });
  }

  const detailDelete = async () => {
    // type, colName, data, idx
    const res = await detailStore('delete', 'myProject', null, result?.postId);
    if (res && res.status === 200) {
      router.push('/community/myProject')
    } else {
      console.error('내 프로젝트 > 게시글 : 삭제 에러', res);
    }
  }

  const onClickUpdateHandler = () => {
    router.push(`/community/myProject/write?postId=${result?.postId}`)
  }

  return (
    <>
      {
        result === null
          ? <div className='nowLoading'>로딩중입니다.</div>
          : <section id="MyProjectDetail">
          <section className='mpDetailHeader'>
            <div className='mpdhTop'>
              <h3>{result?.title}</h3>
              <div className='iconCont'>
                <button
                  type='button'
                  className='share'
                  onClick={shareHandler}>
                  <Image src={Share} width={25} height={24} alt="share icon" />
                </button>
                <button
                  type='button'
                  onClick={() => { onClicklikeHandler(result?.postId as number) }}
                  className={likedAlready ? 'active like' : 'like'}>
                  <p>♥ <span>{result?.like.length}</span></p>
                </button>
              </div>
            </div>
            <div className='mpdhBottom'>
              <div className='hearderBottomLeft'>
                <span className='userId'>{result?.name}</span>
                <span className='postDate'>{result?.date}</span>
              </div>
              <div className='hearderBottomRight' style={hearderBottomRight}>
                <button onClick={onClickUpdateHandler}>수정</button>
                <button onClick={onClickDeleteHandler}>삭제</button>
              </div>
            </div>
          </section>
          <section className='bodyText'>
            {
              result?.image == null ? null : <Image src={result?.image} width={480} height={480} alt="img" ></Image>
            }
            <div className='bodyTextBottom'>
              <ul>
                <li>
                  <h5>개요</h5>
                  <div>
                    <p>{result?.overview}</p>
                  </div>
                </li>
                <li>
                  <h5>프로젝트 목표</h5>
                  <div>
                    <p>{result?.goal}</p>
                  </div>
                </li>
                <li>
                  <h5>사용 기술</h5>
                  <div>
                    {result?.stack.map((stack, index) => (
                      <p className="tag" key={index}>#{stack}</p>
                    ))}
                  </div>
                </li>
                <li>
                  <h5>포지션</h5>
                  <div>
                    {result?.position.map((stack, index) => (
                      <p className="tag" key={index}>#{stack}</p>
                    ))}
                  </div>
                </li>
                <li>
                  <h5>팀 구성</h5>
                  <div>
                    {result?.member.map((stack, index) => (
                      <p className="tag" key={index}>#{stack}</p>
                    ))}
                  </div>
                </li>
              </ul>
              {
                result
                  ? <Link href={result?.link as string} passHref target="_blank">
                  배포 링크 바로가기 ﹥
                  </Link>
                : null  
              }
            </div>
          </section>
          {
            result
              ? <DetailComment result={result} fetchData={fetchData} />
              : null
          }
        </section >
      }
    </>
  );
}