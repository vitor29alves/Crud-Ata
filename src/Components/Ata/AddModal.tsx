import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Button, TextField } from "@mui/material";

import { AtaService } from "./Services/service";






const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 450,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 2.5,
    boxShadow: 24,
    p: 4,
};


export default function AddModal(props: any) {

    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');


    function novaAta() {

        let body = {
            "ataID": 0,
            "titulo": titulo,
            "descricao": descricao,
            "revisada": "n"
        }

        AtaService.nova(body).then((response) => {
            console.log(response)
        })
    }


    return (
        <div>
            <Button onClick={openModal} startIcon={<AddIcon />} variant="contained">Novo</Button>

            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="cardModalHeader">

                        <h1> {props.title} </h1>

                        <Button onClick={closeModal}> <CloseIcon color="action" /> </Button>
                    </div>
                    
                    <hr />

                    <div className="cardModalInputs">

                        <TextField id="titulo" label="Titulo" variant="outlined"
                            required size="small" fullWidth
                            onChange={(v) => {
                                setTitulo(v.target.value)
                            }}
                        />

                        <h4>Descrição</h4>

                        <TextField id="descricao" label="Descrição" variant="outlined"
                            required multiline rows={5} fullWidth
                            onChange={(v) => {
                                setDescricao(v.target.value)
                    
                            }}
                        />
                    </div>

                    <Stack direction="row" spacing={3} justifyContent="flex-end">

                        <Button variant="text" size="medium" onClick={closeModal}>Voltar</Button>
                        
                        <Button variant="contained" size="medium" onClick={() => {
                            novaAta()
                            setOpen(false)
                        }}>Salvar</Button>

                    </Stack>

                </Box>
            </Modal>
        </div>
    );
}