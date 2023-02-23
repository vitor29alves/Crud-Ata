import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { AtaService } from "./Services/service";

export default function AddModal(props: any) {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [open, setOpen] = useState(false);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  function refresh() {
    props.refresh();
    setOpen(false);
  }

  function novaAta() {

    setIsLoading(true);
    setAlert(false);

    let body = {
      ataID: 0,
      titulo: titulo,
      descricao: descricao,
      revisada: "n",
    };

    if (titulo && descricao) {
      AtaService.nova(body)
        .then((response) => {
          
        })
        .catch((error) => {})
        .finally(() => {
          refresh();
          setIsLoading(false);
          setAlert(false);
          setTitulo('');
          setDescricao('');
        });
    } else {
      setAlert(true);
      setIsLoading(false);
    }
  }

  
  return (
    <div>
      <Button onClick={openModal} startIcon={<AddIcon />} variant="contained">
        Novo
      </Button>

      <Dialog
        open={open}
        onClose={closeModal}
        fullWidth={true}
        fullScreen={fullScreen}
      >
        <Box sx={{ width: "90%", margin: "auto", paddingBottom: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1> {props.title} </h1>

            <Button onClick={closeModal}>
              <CloseIcon color="action" />
            </Button>
          </Stack>

          <hr />

          <Box sx={{ width: "100%" }}>
            <Collapse in={alert}>
              <Alert
                severity={"error"}
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
                Preencha todos os campos!
              </Alert>
            </Collapse>
          </Box>

          <TextField
            sx={{ marginTop: 2 }}
            id="titulo"
            label="Titulo"
            variant="outlined"
            required
            size="small"
            fullWidth
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
                data=""
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setDescricao(data);
                }}
              />
            </div>


          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            flexWrap={"wrap"}
            marginTop={2}
          >
            <Button variant="text" size="medium" onClick={closeModal}>
              Voltar
            </Button>

            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                novaAta();
              }}
            >
              Salvar
              {isLoading ? <CircularProgress color="inherit" size={20} /> : ""}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
}
