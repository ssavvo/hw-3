import * as React from 'react';
import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={`${styles.card} ${className ? className : ''}`} onClick={onClick}>
      <img src={image} alt="Картиночка" className={`${styles.cardImage}`} />
      <div className={`${styles.cardInfo}`}>
        <div className={`${styles.cardText}`}>
          {captionSlot}
          <Text view="p-20" weight={'medium'} color="primary" maxLines={2}>
            {title}
          </Text>
          <Text color={'secondary'} view={'p-16'} maxLines={3}>
            {subtitle}
          </Text>
        </div>
        {(contentSlot || actionSlot) && (
          <div className={`${styles.cardSlots}`}>
            <div className={`${styles.cardContent}`}>
              {contentSlot && (
                <Text view={'p-18'} weight={'bold'}>
                  {contentSlot}
                </Text>
              )}
            </div>
            <div>{actionSlot}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
