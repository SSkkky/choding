"use client";
import { useRouter } from 'next/navigation';
import { storage } from '@/firebase/firebase-sdk';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { myProjectPostType } from '@/types/datatype';
import './MyProjectWrite.scss';
import FilterComponent from './components/FilterComponent';
import InputSection from './components/InputSection';
import serverStore from '@/lib/server/serverStore';
import { useSession } from 'next-auth/react';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

type FieldName = keyof myProjectPostType;

export default function MyProjectWrite() {
    const { data: session, status } = useSession();
    const router = useRouter();

    dayjs.locale('ko');
    const today = dayjs().format("YYYY년 MM월 DD일");

    const [pid, setPid] = useState<number>(0);
    let checkResult: myProjectPostType[] = [];

    useEffect(() => {
        if (status !== 'authenticated') { // 비회원 글쓰기 방지
            swal("로그인해주세요!", "비회원은 글을 작성할 수 없습니다.", "warning")
            router.push('/login');
        }

        async function fetchData() {
            await dataCrl('get');
            const maxId = checkResult.reduce(
                (max, item) => item.postId > max ? item.postId : max,
                checkResult[0].postId
            )
            setPid(Number(maxId + 1));
            setValue('postId', Number(maxId + 1));
        }
        fetchData();
    }, []);


    // 데이터 가져오기 :)
    async function dataCrl(type: string) {
        const res = await serverStore(type, 'myProject');
        if (res !== null) {
            checkResult = res.data;
        }
    }

    const { formState: { errors }, register, watch, setValue, handleSubmit: handleFormSubmit } = useForm<myProjectPostType>({
        defaultValues: {
            date: today,
            overview: "",
            position: [],
            postId: 0,
            title: "",
            goal: "",
            link: "",
            member: [],
            stack: [],
            image: undefined,
            like: [],
            comments: [],
            name: session?.user?.name,
            email: session?.user?.email,
        },
    });
    const [activeOptions, setActiveOptions] = useState<string[]>([]);
    const [isOnButtonActive, setisOnButtonActive] = useState(false);
    const filterRef = useRef<HTMLHeadingElement | null>(null);
    const [imgText, setImgText] = useState("파일 선택");


    // 이미지 주소 저장
    const imageSubmit = async (event:any) => {
        event.preventDefault();
        setImgText('파일 선택')

        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const storageRef = ref(storage, 'writeImg/' + file.name);

            try {
                await uploadBytes(storageRef, file)
                    .then(async snapshot => {
                        const url = await getDownloadURL(ref(storage, snapshot.metadata.fullPath));
                        setValue('image', url, { shouldValidate: true });
                        setImgText('이미지 업로드 완료')
                    })
                swal("성공", "이미지가 업로드 되었습니다 :)", "success")
            } catch (error) {
                swal("오류", "이미지 업로드 실패! 다시 시도해주세요.", "warning")
            }
        }
    };


    // 뒤로가기
    const onClickBackHandler = () => {
        router.back();
    }

    // 버튼(옵션)을 선택했을때
    const handleOptionClick = (option: string, type: string) => {
        setActiveOptions(prevState => {
            if (prevState.includes(option)) {
                // 이미 상태에 포함되어 있다면 제거
                return prevState.filter(opt => opt !== option);
            } else {
                // 그렇지 않다면 상태에 추가
                return [...prevState, option];
            }
        });
    }

    // 폼 전송
    const onSubmit = async (data: myProjectPostType) => {
        // console.log('------------data------------')
        // console.log(data)
        await serverStore('post', 'myProject', data);
        router.push('/community/myProject');
    };

    return (
        <section id="MyProjectWrite">
            <form onSubmit={handleFormSubmit(onSubmit)}>
                <input type="hidden" {...register('date')} />
                <input type="hidden" {...register('postId')} />
                <input type="hidden" {...register('comments')} />
                <input type="hidden" {...register('email')} />
                <input type="hidden" {...register('name')} />
                <section id="writeHeader">
                    <h4>새 프로젝트 작성</h4>
                    <input
                        {...register('title', {
                            required: '*필수 입력 사항입니다!',
                            minLength: {
                                value: 2,
                                message: '제목을 입력해주세요'
                            }
                        })}
                        placeholder='제목을 입력해주세요'
                    />
                </section>
                <section id="myProjectWriteImage">
                    <label htmlFor="imgUpload">{imgText}</label>
                    <input id="imgUpload" type="file" onChange={imageSubmit} />
                </section>
                <section id="writeStep1" className='writeStep'>
                    <InputSection
                        register={register}
                        num={1}
                        titleGuide={'어떤 프로젝트를 하셨나요?'}
                        classname={'overview'}
                        title={'개요'}
                        errors={errors}
                    />
                    <FilterComponent
                        setValue={setValue}
                        watch={watch}
                        title={'개발 인원'}
                        type={'member'}
                        options={['개인', '팀']}
                        handleOptionClick={handleOptionClick}
                        activeOptions={activeOptions}
                    />
                    <FilterComponent
                        setValue={setValue}
                        watch={watch}
                        title={'내 포지션'}
                        type={'position'}
                        options={['리드 개발자', '서브 개발자']}
                        handleOptionClick={handleOptionClick}
                        activeOptions={activeOptions}
                    />
                </section>
                <section id="writeStep2" className='writeStep'>
                    <InputSection
                        register={register}
                        num={2}
                        titleGuide={'프로젝트를 소개해주세요!'}
                        classname={'goal'}
                        title={'프로젝트 목표'}
                        errors={errors}
                    />
                    <FilterComponent
                        setValue={setValue}
                        watch={watch}
                        title={'사용 기술'}
                        type={'stack'}
                        options={['HTML', 'CSS', 'JS', 'TS', 'React', 'Vue', 'Nextjs', 'GIT']}
                        handleOptionClick={handleOptionClick}
                        activeOptions={activeOptions}
                    />
                </section>
                <section id="writeStep3" className='writeStep'>
                    <InputSection
                        register={register}
                        num={3}
                        titleGuide={'링크를 입력해주세요.'}
                        classname={'link'}
                        title={''}
                        errors={errors}
                    />
                </section>
                <section className='submit'>
                    <button type="button" className='back' onClick={onClickBackHandler}>취소</button>
                    <button type="submit" className='confirm'>등록</button>
                </section>
            </form>
        </section>
    );
}