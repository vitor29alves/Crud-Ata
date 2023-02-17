import { useState } from "react";
import CachedIcon from "@mui/icons-material/Cached";
import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

import AddModal from "./AddModal";

export default function Header(props: any) {
  const [filtro, setFiltro] = useState("");

  function buscarFiltro() {
    setTimeout(()=> 
      props.getData(filtro)
    ,100)
  }

  function refresh() {
    props.getData("");
  }

  return (
    <Stack marginBottom={2.5}>
      <h1>Consulta de Atas</h1>

      <Stack direction="row" spacing={2}>
        <AddModal title="Criar Ata" refresh={refresh} />

        <TextField
          id="outlined-basic"
          label="Pesquisar"
          variant="outlined"
          size="small"
          sx={{ width: "500px" }}
          onChange={(v) => {
            setFiltro(v.target.value);
            buscarFiltro();
          }}
        />

        <Button className="refreshButton" onClick={refresh} variant="text">
          <CachedIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
