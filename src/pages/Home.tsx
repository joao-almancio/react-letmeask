import { Button } from "../components/Button";


import { useHistory } from "react-router";
import { useAuth } from "../hooks/AuthContext";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from '../assets/images/logo.svg';
import googleIconImg from "../assets/images/google-icon.svg";

import '../styles/auth.scss';

export function Home() {
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
          <form action="">
            <input
              type="text"
              placeholder="Digite o código da sala"
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