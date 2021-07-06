import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { QuestionActionButton } from '../../components/QuestionActionButton';

import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';

import "./styles.scss";
import logImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const { id: roomId } = useParams<RoomParams>();
  const history = useHistory();
  const { questions, title } = useRoom(roomId);

  async function handleCheckQuestionAsAnswered(questionId: string, checkState: boolean) {
    const questionRef = database.ref(`rooms/${roomId}/questions/${questionId}`);
    await questionRef.update({
      isAnswered: !checkState
    });
  }

  async function handleHighlightQuestion(questionId: string, checkState: boolean) {
    const questionRef = database.ref(`rooms/${roomId}/questions/${questionId}`);
    await questionRef.update({
      isHighlighted: !checkState
    });
  }

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
                  isHighlighted={question.isHighlighted}
                  isAnswered={question.isAnswered}

                  actions={[
                    <QuestionActionButton
                      onClick={() => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}
                      imgSrc={checkImg}
                      alt="Marcar pergunta como respondida"
                      title="Marcar pergunta como respondida"
                    />,
                    <QuestionActionButton
                      onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}
                      imgSrc={answerImg}
                      alt="Dar destaque à pergunta"
                      title="Dar destaque à pergunta"
                    />,
                    <QuestionActionButton
                      onClick={() => handleDeleteQuestion(question.id)}
                      imgSrc={deleteImg}
                      alt="Deletar pergunta"
                      title="Deletar pergunta"
                    />
                  ]}
                />
              )
            })
          }
        </div>

      </main>
    </div>
  )
}