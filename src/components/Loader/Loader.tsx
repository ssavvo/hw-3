import * as React from 'react';

import styles from './Loader.module.scss';

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const sizeStyles = {
    's': styles.loaderSmall,
    'm': styles.loaderMedium,
    'l': styles.loaderLarge
}
const Loader: React.FC<LoaderProps> = ({size = 'l', className = ''}) => {

    return (
        <div className={`${styles.loader} ${sizeStyles[size]} ${className}`}>
        </div>
    )
};

export default Loader;