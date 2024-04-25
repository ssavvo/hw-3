import * as React from 'react';

import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent';
  /** Максимальное кол-во строк */
  maxLines?: number;
};
const colorStyle: { [K in NonNullable<TextProps['color']>]: string } = {
  primary: styles.textPrimary,
  secondary: styles.textSecondary,
  accent: styles.textAccent,
};

const viewStyles: { [K in NonNullable<TextProps['view']>]: string } = {
  title: styles.textTitle,
  button: styles.textButton,
  'p-20': styles.text20,
  'p-18': styles.text18,
  'p-16': styles.text16,
  'p-14': styles.text14,
};

const weightStyles: { [K in NonNullable<TextProps['weight']>]: string } = {
  normal: styles.textNormal,
  medium: styles.textMedium,
  bold: styles.textBold,
};

const Text: React.FC<TextProps> = ({ tag = 'p', color, view, weight, maxLines, className = '', children }) => {
  const optionalStyles = [
    color ? colorStyle[color] : '',
    view ? viewStyles[view] : '',
    weight ? weightStyles[weight] : '',
    maxLines ? styles.textLines : '',
    className ? className : '',
  ];

  return React.createElement(
    tag,
    {
      className: [styles.text, ...optionalStyles].join(' '),
      style: { '--max-lines': maxLines ? maxLines : 'none' },
    },
    children,
  );
};

export default Text;
