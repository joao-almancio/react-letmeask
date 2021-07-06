import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

import "./styles.scss";
import logImg from '../../assets/images/logo.svg';

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>();
  const history = useHistory();
  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Você tem certeza que quer excluir esta pergunta?')) {
      const questionRef = database.ref(`rooms/${roomId}/questions/${questionId}`);
      await questionRef.remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    });

    history.push('/');
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {
            questions.length > 0 && <span>{questions.length} pergunta(s)</span>
          }
        </div>

        <div className="question-list">
          {
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  onDelete={() => handleDeleteQuestion(question.id)}
                />
              )
            })
          }
        </div>

      </main>
    </div>
  )
}