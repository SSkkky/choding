import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { myProjectPostType } from '@/types/datatype';

type InputSectionType = {
    num: number;
    classname: string;
    titleGuide: string;
    title: string;
    register: UseFormRegister<myProjectPostType>;
    errors: FieldErrors<myProjectPostType>;
  };
  

export default function InputSection({ num, classname, titleGuide, title, register, errors }: InputSectionType) {
    let placetext;
    switch (classname) {
        case 'overview':
            placetext = '예) 투두투두는 투두리스트를 직관적으로 관리할 수 있는 웹 서비스입니다.';
            break;
        case 'goal':
            placetext = '예) 복습 (10글자 이내)';
            break;
        case 'link':
            placetext = 'http://, https://를 포함해 작성해주세요';
            break;
        default:
            placetext = '';
            break;
    }

    // 유효성 검사
    const getValidationRules = (classname:string) => {
        switch (classname) {
          case 'overview':
            return {
              minLength: {
                value: 10,
                message: '10글자 이상 상세하게 입력해주세요.'
              }
            };
          case 'goal':
              return {
                maxLength: {
                  value: 10,
                  message: '10글자 이하로 간단하게 입력해주세요.'
                }
              };
          case 'link':
            return {
                pattern: {
                    value: /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
                    ,
                    message: 'URL은 "http://" 또는 "https://"로 시작해야 합니다.'
                  }
            };
          default:
            return {};
        }
      }

    const validationRules = getValidationRules(classname);

    function isKeyOfMyProjectPostType(key: any): key is keyof myProjectPostType {
    const validKeys = ['date','overview','position','postId','title','goal','link','member','stack','image','like','comments','name','email'];
      return validKeys.includes(key);
    }

    let classnameKey = isKeyOfMyProjectPostType(classname) ? classname : undefined;

    if (!classnameKey) {
      console.error('Invalid classname provided');
      return null;
    }

    return (
        <section className={classname}>
            <div className='top'>
                <h5><span className='mainBold'>STEP.{num}</span>&nbsp;{titleGuide}</h5>
            </div>
            <div className='topCont'>
                <p className='titleBoldGray'>{title}</p>
            </div>
            {classname === 'link' ? <button type="button" className="mainBold">+ 링크 추가</button> : null}
            <input
              {...register(classnameKey, {
                required: '*필수 입력 사항입니다!',
                ...validationRules 
              })}
              type="text"
              placeholder={placetext} />
            {
              errors[classnameKey] ?
                <p className='errorMsg On'>{errors[classnameKey]?.message}</p> :
                <p className='errorMsg Off'>*필수 입력사항입니다.</p>
            }
        </section>
    )
}