import * as React from 'react';
import './Icon.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ color, children }) => {
  return <div className={`icon ${color ? `icon_${color}` : ''}`}>{children}</div>;
};

export default Icon;
