import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { AtaService } from "./Services/service";

export default function DeleteModal(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const closeModal = () => {
    props.setOpenDeleteModal(false);
    setAlert(false);
  };

  function getData() {
    props.getData();
  }

  function deletarAta(id: number) {
    setIsLoading(true);

    AtaService.deletar(id)
      .then((res: any) => {
        
      })
      .catch((error) => {
        setAlert(true);
        
      })
      .finally(() => {
        setIsLoading(false);
        setAlert(false);
        getData();
        closeModal();
      });
  }

  return (
    <Stack>
      <Dialog
        open={props.openDeleteModal}
        onClose={closeModal}
        fullWidth={true}
      >
        <Box sx={{ width: "90%", margin: "auto", paddingBottom: 2 }}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <h1>Aviso</h1>

            <Button onClick={closeModal}>
              <CloseIcon color="action" />
            </Button>
          </Stack>

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
                Erro! Não foi possivel exluir o item!
              </Alert>
            </Collapse>
          </Box>

          <p>Deseja excluir esta Ata?</p>
          <p>Esta ação é irreversível.</p>

          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Button sx={{ marginRight: 3 }} onClick={closeModal}>
              Voltar
            </Button>

            <Button
              sx={{ backgroundColor: "red" }}
              variant="contained"
              onClick={() => deletarAta(props.deleteId)}
            >
              Excluir
              {isLoading ? <CircularProgress color="inherit" size={20} /> : ""}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Stack>
  );
}
