import "./App.css";
import { WorldClock } from "./components/Watches";
import { Notes } from "./components/CRUD";
import { AnonymousChat } from "./components/Chat";

function App() {
  return (
    <>
      <div className="container">
        <h2 className="title">Задание №1 - Мировые часы</h2>
        <WorldClock></WorldClock>
      </div>
      <div className="container">
        <h2 className="title">Задание №2 - CRUD(без update)</h2>
        <Notes></Notes>
      </div>
      <div className="container">
        <h2 className="title">Задание №3 - Чат(анонимный) </h2>
        <AnonymousChat></AnonymousChat>
      </div>
    </>
  );
}

export default App;
