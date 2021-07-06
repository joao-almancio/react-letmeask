import { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import "./styles.scss";
import logImg from '../../assets/images/logo.svg';
import { useRoom } from '../../hooks/useRoom';

type RoomParams = {
  id: string
}

export function Room() {
  const { id: roomId } = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const { user } = useAuth();
  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newQuestion.trim() === '') return;
    if (!user) {
      throw new Error("You must be logged in.")
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('')
  }

  async function handleLikeQuestion(questionId: string, likeId: string|undefined) {
    if (!user) return;
    if (likeId) {
      const newLike = await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`);
      newLike.remove();
      return
    }
    const newLike = await database.ref(`rooms/${roomId}/questions/${questionId}/likes`);
    newLike.push({
      authorId: user.id
    })
  }



  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {
            questions.length > 0 && <span>{questions.length} pergunta(s)</span>
          }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {
              user
                ? <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
                : <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">
          {
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  onLike={() => handleLikeQuestion(question.id, question.likeId)}
                  likeId={question.likeId}
                  likesNumber={question.likeCount}
                />
              )
            })
          }
        </div>

      </main>
    </div>
  )
}