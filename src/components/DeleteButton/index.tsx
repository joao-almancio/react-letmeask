import { ButtonHTMLAttributes } from 'react'

import './styles.scss';
import deleteImg from '../../assets/images/delete.svg'

type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function DeleteButton({...rest }: DeleteButtonProps) {
  return (
    <button
    className='delete-button'
      {...rest}
      type='button'
    >
      <img src={deleteImg} alt="Remover pergunta" />
    </button>
  )
}