// FilterComponent.tsx
import { useForm, UseFormRegister } from 'react-hook-form';
import { myProjectPostType, FilterComponentType } from '@/types/datatype';
import ButtonComponent from './ButtonComponent';

export default function FilterComponent({ setValue, watch, type, title, options, handleOptionClick, activeOptions }: FilterComponentType) {
  const handleClick = (option: string, type: string) => {
    handleOptionClick(option, type);
    const currentValues = watch(type) || [];

    const newValues: Record<string, any> = {};

    if (currentValues.includes(option)) {
      newValues[type] = currentValues.filter(item => item !== option);
    } else {
      newValues[type] = [...currentValues, option];
    }

    Object.keys(newValues).forEach(key => {
      setValue(key as keyof myProjectPostType, newValues[key] as string, { shouldValidate: true });
    });
  };

  return (
    <section className={type}>
      <p className='titleBoldGray'>{title}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <ButtonComponent
              label={option}
              onClick={() => handleClick(option, type)}
              isActive={activeOptions.includes(option)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
