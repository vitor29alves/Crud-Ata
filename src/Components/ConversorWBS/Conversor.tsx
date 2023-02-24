import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import ModalConversor from "./ModalConversor";
import { ConversorService } from "./Service/service";


export default function Conversor() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [arquivoConvertido, setArquivoConvertido] = useState<any>("");
  const [resultadoConversor, setResultadoConversor] = useState<string>("");
  const [nomeArquivo, setNomeArquivo] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  

  const openAlert = () => {
    setCopyFeedback(true);
  };

  const closeAlert = () => {
    setCopyFeedback(false);
  };

  function converterBase64(file: any) {
    if (file.target.files.length > 0) {
      var receberArquivo = file.target.files[0];

      setNomeArquivo(receberArquivo.name);
      var carregarArquivo = receberArquivo;

      var lerArquivo = new FileReader();

      lerArquivo.onload = function (arquivoCarregado: any) {
        let base64: string = arquivoCarregado.target.result;

        base64 = base64.replace("data:text/plain;base64,", "");

        setArquivoConvertido(base64);
      };

      lerArquivo.readAsDataURL(carregarArquivo);
    }
  }

  function conversorApi() {
    setIsLoading(true);

    const body = {
      arquivoTxt: arquivoConvertido,
    };

    if (arquivoConvertido) {
      ConversorService.converter(body)
        .then((res) => {
          setResultadoConversor(res.data.textoConvertido);
        })
        .catch((error) => {})
        .finally(() => {
          setOpenModal(true);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      openAlert();
    }
  }

  function resetarInput() {
    let fileInput = document.querySelector("#arquivo-txt") as HTMLInputElement;
    fileInput.value = "";
    setArquivoConvertido("");
  }

  return (
    <Box sx={{ margin: "auto" }}>
      <Stack width={"90%"} maxWidth={800}>
        <h1>CS - Conversor WBS</h1>

        <Stack>
          <p>1) Faça o download dos Slides(CS) como Texto</p>
          <p>2) Faça o upload do arquivo gerado</p>
        </Stack>

        <Stack>
          <p style={{ fontWeight: "bold" }}> Arquivo TXT dos Slides </p>

          <Stack
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              component="label"
              size="small"
              sx={{ fontSize: 12, marginRight: 2, textAlign: 'center'}}
            >
              Escolher arquivo
              <input
                id="arquivo-txt"
                hidden
                type="file"
                onChange={converterBase64}
              />
            </Button>
            <Stack>
              <p style={{ fontSize: 10 }}>{nomeArquivo}</p>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2.5,
          }}
        >
          <Button
            variant="text"
            sx={{ marginRight: 2.5, width: 100 }}
            onClick={resetarInput}
          >
           <a href="/">Voltar</a> 
          </Button>
          <Button
            variant="contained"
            onClick={conversorApi}
            sx={{ maxWidth: 250, maxHeight: 40 }}
          >
            Confirmar
            {isLoading ? (
              <CircularProgress sx={{ p: 2 }} color="inherit" size={20} />
            ) : (
              ""
            )}
          </Button>
        </Stack>
      </Stack>

      <ModalConversor
        openModal={openModal}
        setOpenModal={setOpenModal}
        resultadoConversor={resultadoConversor}
      />

      <Snackbar
        open={copyFeedback}
        autoHideDuration={6000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity="error" sx={{ width: "100%" }}>
          Nenhum arquivo escolhido!
        </Alert>
      </Snackbar>
    </Box>
  );
}
