import { ButtonHTMLAttributes } from 'react'

import './styles.scss';

type QuestionActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  imgSrc: string,
  alt: string
}

export function QuestionActionButton({imgSrc, alt, ...rest }: QuestionActionButtonProps) {
  return (
    <button
    className='question-action-button'
      {...rest}
      type='button'
    >
      <img src={imgSrc} alt={alt}/>
    </button>
  )
}