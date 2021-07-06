import { DeleteButton } from "../DeleteButton"
import { LikeButton } from "../LikeButton"

import "./styles.scss"

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };

  likeId?: string;
  likesNumber?: number;
  onLike?: () => void;
  onDelete?: () => void;
}

export function Question({
  content,
  author,
  onLike,
  likeId,
  likesNumber,
  onDelete,
}: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {
            onLike
            && <LikeButton
              likeId={likeId}
              likesNumber={likesNumber}
              onClick={onLike}
            />
          }

          {
            onDelete
            && <DeleteButton
              onClick={onDelete}
            />
          }
        </div>
      </footer>
    </div>
  )
}