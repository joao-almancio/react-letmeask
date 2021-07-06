import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";

import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import './styles.scss';
import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from "../../assets/images/google-icon.svg";


export function Home() {
  const [ roomCode, setRoomCode ] = useState("")
  const history = useHistory();
  const { user, signIn } = useAuth()

  async function handleCreateRoom() {
    try {
      if (!user) {
        await signIn();
        history.push('/rooms/new')
        return;
      }
      history.push('/rooms/new')

    } catch (error) {
      console.log(error);
      history.push('/')
    }
  }

  async function handleJoinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (roomCode.trim() === '') return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().closedAt) {
      alert('Room already closed.')
      setRoomCode('')
      return
    }

    setRoomCode('');
    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <p className="separator">ou entre em uma sala</p>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}