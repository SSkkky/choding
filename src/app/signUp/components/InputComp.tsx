import { UseFormRegister, RegisterOptions, FieldErrors, useForm } from 'react-hook-form';
import { signUpType } from '@/types/user';
import { userDataType } from '@/types/user';
import swal from 'sweetalert';

type InputSectionType = {
    type: string,
    id: Extract<keyof signUpType, string>,
    title: string,
    placeholder: string,
    register: UseFormRegister<signUpType>,
    errors: FieldErrors<signUpType>,
    watch: (type: string) => string,
    LoginData: userDataType[],
    setNameCheck: React.Dispatch<React.SetStateAction<boolean>>,
    setEmailCheck: React.Dispatch<React.SetStateAction<boolean>>
};

type ValidateFunction = (id: string) => RegisterOptions;

export default function InputComp({ type, id, title, placeholder, register, errors, watch, LoginData, setNameCheck, setEmailCheck }: InputSectionType) {


    // 유효성 검사
    const watchPassword = watch('password');
    const watchName = watch('name');
    const watchEmail = watch('email');
    const getValidationRules: ValidateFunction = (id): RegisterOptions => {
        switch (id) {
            case 'name':
                return {
                    minLength: {
                        value: 2,
                        message: '닉네임은 최소 2글자 이상이어야 합니다.'
                    },
                    maxLength: {
                        value: 6,
                        message: '닉네임은 최대 6글자 이하여야 합니다.'
                    }
                };
            case 'password':
                return {
                    pattern: {
                        value: /^(?:(?=.*[A-Za-z])(?=.*[\d@$!%*#?&])|(?=.*[\d@$!%*#?&])(?=.*[A-Za-z]))[\w@$!%*#?&]{6,20}$/,
                        message: '영문/숫자/특수문자 2가지 이상 조합, 6~20자 이내로 입력해주세요!'
                    }
                };
            case 'passwordCheck':
                return {
                    validate: (value: string) => value === watchPassword || '비밀번호가 일치하지 않습니다.'
                };
            case 'email':
                return {
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: '유효하지 않은 이메일 주소입니다.'
                    }
                };
            default:
                return {};
        }
    }
    const validationRules = getValidationRules(id);



    // 중복 확인
    const duplicateCheck = (id: string) => {
        // console.log('id : ', id)
        // console.log('watchName :', watchName)
        if (id === 'name') { // 닉네임 중복 확인
            const includeCheck = LoginData && LoginData.map((item) => item.name).includes(watchName);
            console.log('LoginData', LoginData)
            console.log('includeCheck', includeCheck)

            if (includeCheck) {
                swal("오류", "이미 존재하는 닉네임입니다!", "warning")
                setNameCheck(false)
            } else {
                swal("성공", "사용 가능한 닉네임입니다.", "success")
                setNameCheck(true)
            }
        } else { // 이메일 중복 확인
            const includeCheck = LoginData && LoginData.map((item) => item.email).includes(watchEmail);
            if (includeCheck) {
                swal("오류", "이미 존재하는 이메일입니다!", "warning")
                setEmailCheck(false)
            } else {
                swal("성공", "사용 가능한 이메일입니다.", "success")
                setEmailCheck(true)
            }
        }
    }


    // 중복검사 후 true인채로 정보를 변경하는 경우 false로 리셋
    const returnfalse = () => {
        if (id == 'name') {
            setNameCheck(false)
        } else if (id == 'email') {
            setEmailCheck(false)
        }
    }


    return (
        <div className='field'>
            <label htmlFor={id}><b>{title}</b></label>
            <div className='input-group'>
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register(id, {
                        required: true,
                        ...validationRules
                    })}
                    onChange={returnfalse}
                />
                {id == "name" || id == "email" ? <button type="button" onClick={() => { duplicateCheck(id) }}>중복 확인</button> : null}
            </div>
            {errors[id] ? <p className='errorMsg On'>{errors[id]?.message}</p> : null}
        </div>
    )
}