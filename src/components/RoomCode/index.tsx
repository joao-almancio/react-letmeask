import "./styles.scss";
import copyImg from '../../assets/images/copy.svg';

type RoomCodeProps = {
  code: string
}

export function RoomCode({code}: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(code);
  }
  return (
    <button className="room-code" onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="Copiar" />
      </div>
      <span>Sala {code}</span>
    </button>
  )
}