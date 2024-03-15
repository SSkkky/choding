// ButtonComponent.tsx
type ButtonComponentType = {
  label: string,
  onClick: () => void,
  isActive: boolean
}

export default function ButtonComponent({ label, onClick, isActive }: ButtonComponentType) {
  return (
    <button
      type="button"
      className={isActive ? 'active' : ''}
      onClick={onClick}>
      {label}
    </button>
  );
}
