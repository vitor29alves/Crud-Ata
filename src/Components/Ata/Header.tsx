
import { useState } from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { Button, TextField } from "@mui/material";
import Stack from '@mui/material/Stack';


import AddModal from "./AddModal";



export default function Header(props: any) {

    const [filtro, setFiltro] = useState('');

    function buscarFiltro() {

        props.getData(filtro)

    }

    function refresh() {
        props.getData('')
    }
    

    return (
        <div className='header'>

            <h1>Consulta de Atas</h1>


            <Stack direction="row" spacing={2} >

                <AddModal title='Criar Ata' />

                <TextField id="outlined-basic" label="Pesquisar" variant="filled" size="small"
                    onChange={(v)=>{
                        setFiltro(v.target.value);
                        buscarFiltro();
                    }}
                />

                <Button className='refreshButton'
                    onClick={refresh} variant="text"> <CachedIcon /> </Button>

            </Stack>


        </div>

    )
}