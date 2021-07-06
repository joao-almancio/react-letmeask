import { ReactNode } from "react";

import "./styles.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  actions?: ReactNode[]
  isHighlighted?: boolean,
  isAnswered?: boolean,
}

export function Question({
  content,
  author,
  actions,
  isHighlighted,
  isAnswered
}: QuestionProps) {

  return (
    <div className={`question ${isHighlighted ? 'highlighted' : ''} ${isAnswered ? 'answered' : ''}` }>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="action-button-container">
          {
            actions
              ?.filter((item, index) => {
                return <span key={index}>{item}</span>
              })
          }
        </div>
      </footer>
    </div>
  )
}