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
    width: 550,
    height: 550,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 2.5,
    boxShadow: 24,
    p: 4,
};


export default function EditModal(props: any) {


    const closeModal = () => props.setEditModal(false)

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');



    function atualizarAta(){
        let body = {
            "ataID": 0,
            "titulo": titulo,
            "descricao": descricao,
            "revisada": "n"
        }

        AtaService.editar(body).then((response) => {
            console.log(response)
        })
    }


    return (
        <div>
            <Modal
                open={props.editModal}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className="cardModalHeader">

                        <h1>{props.title}</h1>

                        <Button onClick={closeModal}> <CloseIcon color="action" /> </Button>

                    </div>

                    <hr />

                    <div className="editModalHeader">
                        <div>
                            <h4>ID</h4>
                            <p>{props.uniqueKey}</p>
                        </div>
                        <div>
                            <h4>Criada em</h4>
                            <p>{props.dataCadastro}</p>
                        </div>
                    </div>

                    <div className="cardModalInputs">

                        <TextField id="titulo" variant="outlined"
                            required size="small" fullWidth
                            // value={props.titulo}
                            onChange={(v) => {
                                setDescricao(v.target.value)
                            }}
                        />

                        <h4>Descrição</h4>

                        <TextField id="descricao" label="Descrição" variant="outlined"
                            required multiline rows={5} fullWidth
                            // value={props.descricao}
                            onChange={(v) => {
                                setDescricao(v.target.value)
                            }}
                        />
                    </div>


                    <Stack direction="row" spacing={3} justifyContent="flex-start">
                        <input value={props.revisada} type="checkbox" name="revisada" id="revisada" />
                        <p>Revisada PS000356</p>
                    </Stack>


                    <Stack direction="row" spacing={3} justifyContent="flex-end">

                        <Button variant="text" size="medium" onClick={closeModal}>Voltar</Button>

                        <Button variant="contained" size="medium" onClick={() => {

                        }}>Salvar</Button>

                    </Stack>

                </Box>
            </Modal>
        </div>
    );
}