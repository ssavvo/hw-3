import * as React from 'react';
import ArrowDownIcon from 'components/Icons/ArrowDownIcon';
import Input from 'components/Input';
import './MultiDropdown.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  getTitle,
  value,
  onChange,
  disabled = false,
  options,
  className,
}) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const isSelected = (option: Option) => {
    return value.some((opt) => opt.key === option.key);
  };

  const handleSelect = (option: Option) => {
    if (value.includes(option)) {
      onChange(value.filter((opt) => opt !== option));
    } else {
      onChange([option]);
    }
  };

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [listRef]);

  return (
    <div className={`dropdown ${className}`} onClick={() => setIsOpen(true)} ref={listRef}>
      <Input
        value={value.length > 0 ? getTitle(value) : filter}
        placeholder={getTitle(value)}
        onChange={(v: string) => setFilter(v)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color={'secondary'} />}
      />
      {isOpen && !disabled && (
        <ul className={'dropdown__list'}>
          {options
            .filter((opt) => {
              if (filter === '') return true;
              return opt.value.toLowerCase().includes(filter.toLowerCase());
            })
            .map((option) => {
              return (
                <li
                  className={`dropdown__item ${isSelected(option) ? 'dropdown__item_selected' : ''}`}
                  key={option.key}
                  onClick={() => handleSelect(option)}
                >
                  {option.value}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
