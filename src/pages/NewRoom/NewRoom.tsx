import { FormEvent, useState, } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Button } from "../../components/Button";

import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';


import './styles.scss';
import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from '../../assets/images/logo.svg';


export function NewRoom() {
  const [ newRoom, setNewRoom ] = useState('')
  const { user } = useAuth();
  const history = useHistory();


  async function handleCreateRomm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      console.error("Invalid room name.")
      return
    };
    if (!user) {
      console.error("Invalid user. Please Login.")
      return
    };

    console.log(newRoom)
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user.id,

    });

    setNewRoom('');
    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRomm}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/" title="Entrar em uma sala existente">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}