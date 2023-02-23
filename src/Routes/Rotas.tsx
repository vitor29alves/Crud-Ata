import { Routes, Route } from "react-router-dom";
import GridData from "../Components/Ata/GridData";
import Conversor from "../Components/ConversorWBS/Conversor";

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Consulta-Atas" element={<GridData />} />
      <Route path="/Conversor-WBS" element={<Conversor />} />
    </Routes>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: "rgb(13, 108, 168)",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a href="/Consulta-Atas" style={{color: 'white'}}>
            Consulta Atas
          </a>
        </div>
        <div
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: "rgb(13, 108, 168)",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a href="/Conversor-WBS" style={{color: 'white'}}>
            Conversor WBS
          </a>
        </div>
      </div>
    </div>
  );
}
