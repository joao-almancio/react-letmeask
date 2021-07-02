import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({...rest}: Props) {
  return (
    <button className="button" {...rest}/>
  )
}