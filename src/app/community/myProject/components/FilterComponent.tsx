// FilterComponent.tsx
import ButtonComponent from './ButtonComponent';

type FilterComponentType = {
  sectionName: string,
  title: string,
  options: string[],
  handleOptionClick: (option:string) => void,
  activeOptions: string[]
}

export default function FilterComponent({ sectionName, title, options, handleOptionClick, activeOptions }:FilterComponentType) {
  return (
    <div className={sectionName}>
      <b>{title}</b>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <ButtonComponent 
            label={option} 
            onClick={() => handleOptionClick(option)}
            isActive={activeOptions.includes(option)} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
