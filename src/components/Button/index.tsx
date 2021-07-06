import { ButtonHTMLAttributes } from 'react';
import './styles.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({isOutlined=false, ...rest}: Props) {
  return (
    <button
    className={`button ${isOutlined ? 'outlined' : ''}`}
    {...rest}/>
  )
}