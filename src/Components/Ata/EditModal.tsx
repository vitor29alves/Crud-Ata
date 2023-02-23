import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  Dialog,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { AtaService } from "./Services/service";


export default function EditModal(props: any) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [revisada, setRevisada] = useState(false);

  const [alert, setAlert] = useState(false);
  const [statusApi, setStatusApi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const closeModal = () => {
    props.setEditModal(false);
    setAlert(false);
  };

  useEffect(() => {
    if (props.id) {
      obter(props.id);
    }
  }, [props.id]);

  function getData() {
    props.getData("");
  }

  function obter(id: number) {
    AtaService.obter(id)
      .then((response) => {
        setErrorMessage(response.data.errorMessage);

        if (response.data.errorCode != 0) {
        } else {
          setTitulo(response.data.result.titulo);
          setDescricao(response.data.result.descricao);
          setRevisada(response.data.result.revisada);
        }
      })
      .catch((error) => {});
  }

  function atualizarAta() {
    let body = {
      ataID: props.id,
      titulo: titulo,
      descricao: descricao,
      revisada: revisada ? "S" : "N",
    };

    setIsLoading(true);

    AtaService.editar(body)
      .then((response) => {
        setErrorMessage(response.data.errorMessage);

        if (response.data.errorCode != 0) {
          setStatusApi(false);
          setAlert(true);
        } else {
          setStatusApi(true);
          setAlert(true);
        }
      })
      .catch((error) => {
        setStatusApi(false);
        setAlert(true);
      })
      .finally(() => {
        setIsLoading(false);
        getData();
      });
  }

  return (
    <Stack>
      <Dialog
        open={props.editModal}
        onClose={closeModal}
        fullScreen={fullScreen}
        fullWidth={true}
      >
        <Box sx={{ padding: 3 }}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h1>{props.title}</h1>

            <Button onClick={closeModal}>
              <CloseIcon color="action" />
            </Button>
          </Stack>

          <hr />

          <Box sx={{ width: "100%" }}>
            <Collapse in={alert}>
              <Alert
                severity={statusApi ? "success" : "error"}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {statusApi
                  ? "Ata editada com sucesso!"
                  : errorMessage != ""
                  ? errorMessage
                  : "Erro na atualização!"}
              </Alert>
            </Collapse>
          </Box>

          <Stack flexDirection={"row"} alignItems={"center"}>
            <Stack sx={{ marginRight: 5 }}>
              <h4>ID</h4>
              <p>{props.uniqueKey}</p>
            </Stack>
            <Stack>
              <h4>Criada em</h4>
              <p>{props.dataCadastro}</p>
            </Stack>
          </Stack>

          <div className="cardModalInputs">
            <TextField
              id="titulo"
              variant="outlined"
              required
              size="small"
              fullWidth
              value={titulo}
              onChange={(v) => {
                setTitulo(v.target.value);
              }}
            />

            <h4>Descrição</h4>

            <div
              style={{
                width: "100%",
                margin: "auto"
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={descricao}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setDescricao(data);
                }}
              />
            </div>
          </div>

          <Stack direction="row" spacing={3} justifyContent="flex-start">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={revisada}
                    onChange={(event, checked: boolean) => {
                      setRevisada(checked);
                    }}
                  />
                }
                label="Revisada (PS000356)"
              />
            </FormGroup>
          </Stack>

          <Stack direction="row" spacing={3} justifyContent="flex-end">
            <Button variant="text" size="medium" onClick={closeModal}>
              Voltar
            </Button>

            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                atualizarAta();
              }}
              sx={{ maxWidth: 250, maxHeight: 40 }}
            >
              Salvar
              {isLoading ? (
                <CircularProgress sx={{ p: 2 }} color="inherit" size={20} />
              ) : (
                ""
              )}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Stack>
  );
}
