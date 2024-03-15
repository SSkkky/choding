"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpType } from '@/types/user';
import InputComp from './components/InputComp';
import serverStore from '@/lib/server/serverStore';
import { useRouter } from 'next/navigation';
import { userDataType } from '@/types/user';
import swal from 'sweetalert';
import './signUp.scss';

export default function SignUp() {
    const router = useRouter();
    const [nameCheck, setNameCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);

    const [LoginData, setLoginData] = useState<userDataType[]>([]);




    // 데이터 가져오기
    async function dataCrl(type: string) {
        const res = await serverStore(type, 'LoginData', null, null);
        if (res !== null) {
            setLoginData(res.data)
        }
    }

    useEffect(() => {
        dataCrl('get')
    }, [])


    // useForm 
    const { formState: { errors }, register, watch, setValue, handleSubmit: handleFormSubmit } = useForm<signUpType>({
        defaultValues: {
            name: '',
            password: '',
            email: '',
            image: 'https://firebasestorage.googleapis.com/v0/b/choding.appspot.com/o/writeImg%2FuserDefault.png?alt=media&token=21a6d29c-aa75-4f34-97a4-0935a44fbe2e'
        },
    });


    // 제출
    const onSubmit = async (data: signUpType) => {
        if (!nameCheck) {
            swal("오류", "닉네임 중복 체크를 해주세요!", "warning")
        } else if (!emailCheck) {
            swal("오류", "이메일 중복 체크를 해주세요!", "warning")
        } else if (nameCheck && emailCheck) {
            // 닉네임, 이메일 중복체크 성공 후
            await delete data.passwordCheck;
            // console.log(data)
            // 이제 post
            await serverStore('post', 'LoginData', data, null);
            swal("회원 가입에 성공했습니다!", "로그인 페이지로 이동하시겠습니까?", "success")
                .then(() => {
                    router.push('/login');
                });
        }

    }

    return (
        <article id='signUp'>
            <header>
                <h2>회원가입</h2>
            </header>
            <form onSubmit={handleFormSubmit(onSubmit)}>
                <InputComp
                    type={'text'}
                    id={'name'}
                    title={'닉네임'}
                    placeholder={'2글자 이상 6자 이내'}
                    register={register}
                    errors={errors}
                    watch={watch}
                    LoginData={LoginData}
                    setNameCheck={setNameCheck}
                    setEmailCheck={setEmailCheck}
                />
                <InputComp
                    type={'password'}
                    id={'password'}
                    title={'비밀번호'}
                    placeholder={'영문/숫자/특수문자 2가지 이상 조합, 6~20자 이내'}
                    register={register}
                    errors={errors}
                    watch={watch}
                    LoginData={LoginData}
                    setNameCheck={setNameCheck}
                    setEmailCheck={setEmailCheck}
                />
                <InputComp
                    type={'password'}
                    id={'passwordCheck'}
                    title={'비밀번호 확인'}
                    placeholder={'비밀번호를 다시 한 번 입력해주세요!'}
                    register={register}
                    errors={errors}
                    watch={watch}
                    LoginData={LoginData}
                    setNameCheck={setNameCheck}
                    setEmailCheck={setEmailCheck}
                />
                <InputComp
                    type={'email'}
                    id={'email'}
                    title={'이메일 주소'}
                    placeholder={'이메일을 입력해주세요'}
                    register={register}
                    errors={errors}
                    watch={watch}
                    LoginData={LoginData}
                    setNameCheck={setNameCheck}
                    setEmailCheck={setEmailCheck}
                />
                <div className="actions">
                    <button type="submit" className="on">가입</button>
                </div>
            </form>
        </article >

    );
}