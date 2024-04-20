import * as React from 'react';
import Loader from "components/Loader";
import Text from "components/Text";
import styles from './Button.module.scss';


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Состояние загрузки */
    loading?: boolean;
    /** Текст кнопки */
    children: React.ReactNode;
};
/* eslint-disable react/prop-types */
const Button: React.FC<ButtonProps> = ({
                                           children,
                                           loading = false,
                                           className = '',
                                           disabled = false,
                                           ...props
                                       }) => {

    return (
        <button
            className={`${styles.btn} ${disabled ? styles.disabled: ''} ${className}`} disabled={disabled || loading} {...props}>
            {loading && <Loader size='s' className={`${styles.loader}`}/>}
                {
                    children
                }
        </button>
    )
};

export default Button;