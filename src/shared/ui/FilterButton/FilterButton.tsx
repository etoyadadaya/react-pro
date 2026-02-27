import styles from './FilterButton.module.css';

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export const FilterButton = ({ label, active, onClick }: FilterButtonProps) => {
  return (
    <button className={active ? styles.active : ''} onClick={onClick}>
      {label}
    </button>
  );
};
