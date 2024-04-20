import * as React from 'react';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { afterSlot, className = '', value, onChange, ...props },
  ref,
) {
  return (
    <div className={`input ${className}`}>
      <input
        type="text"
        ref={ref}
        className={`input__field`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {afterSlot}
    </div>
  );
});

export default Input;
