import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = ({ color, className = '', width = 24, height = 24, ...props }) => {
  return (
    <Icon color={color}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className={className}
        {...props}
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M20.62 26.5599L11.9267 17.8666C10.9 16.8399 10.9 15.1599 11.9267 14.1333L20.62 5.43994"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

export default ArrowLeftIcon;
