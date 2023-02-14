import React, { useState, useEffect } from 'react';
import { AtaService } from './Ata/Services/service';
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from './Ata/Header';

import EditModal from './Ata/EditModal';


export default function GridData(props: any) {

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<any[]>([]);
    const [totalRegistros, setTotalRegistros] = useState(0);


    const [editModal, setEditModal] = useState(false);
    const [editId, setEditId] = useState('');
    const [editUniqueKey, setEditUniqueKey] = useState('');
    const [editTitulo, setEditTitulo] = useState('');
    const [editDescricao, setEditDescricao] = useState('');
    const [editRevisada, setEditRevisada] = useState(false);
    const [editdataCadastro, setEditdataCadastro] = useState('');


    useEffect(() => {
        getData('');
    }, [page, pageSize]);



    //obtendo todas as informações da API
    function getData(filtro: string) {

        if (isLoading) return;
        if (!isLoading) setIsLoading(true);
        let currentPage = page + 1;
        let filtros: string = filtro;

        AtaService.listar(currentPage, pageSize, filtros).then((response) => {

            if (response.data.errorCode != 0) {
                setResults([]);
                setTotalRegistros(0);
            }
            else {
                setTotalRegistros(response.data.totalRegistros);
                setResults(response.data.results);
            }

        }).catch((error) => console.log(error))
            .finally(() => setIsLoading(false));

    }

    //editando e salvando a informação
    function editar() {

        AtaService.editar({
            "ataID": 0,
            "titulo": "string",
            "descricao": "string",
            "revisada": "s"
        })
    }

    function deletarAta(id: number) {

        AtaService.deletar(id).then((res: any) => {
            console.log(`Item id: ${id} deletado`)
            console.log(res)
        }).catch()

    }


    //Dados das colunas do Grid


    const columns: GridColumns = [

        {
            field: 'id', headerName: '#ID', sortable: false, disableColumnMenu: true, renderCell(params) {
                return params.row.uniqueKey;
            }
        },
        { field: 'titulo', headerName: 'Título', sortable: false, disableColumnMenu: true, flex: 0.4, },
        { field: 'dataCadastro', headerName: 'Criada em', sortable: false, disableColumnMenu: true, minWidth: 200 },
        {
            field: 'revisada', headerName: 'Revisada', sortable: false, disableColumnMenu: true, minWidth: 200, renderCell(params) {
                return params.row.revisada ? 'Sim' : 'Não';
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<FontAwesomeIcon icon={faPencil} />}
                    label="Editar"
                    onClick={()=> {
                        let index = results.findIndex(x => x.id == params.id);

                        let id = results[index].id;
                        let uniqueKey = results[index].uniqueKey;
                        let titulo = results[index].titulo;
                        let descricao = results[index].descricao;
                        let revisada = results[index].revisada;
                        let dataCadastro = results[index].dataCadastro;

                        console.log('Resultado selecionado Editar: ', results[index]);

                        setEditId(id);
                        setEditUniqueKey(uniqueKey)
                        setEditTitulo(titulo);
                        setEditDescricao(descricao);
                        setEditRevisada(revisada);
                        setEditdataCadastro(dataCadastro);
                        setEditModal(true);
                    }}
                    showInMenu
                />,

                <GridActionsCellItem
                    icon={<DeleteIcon className="text-danger" />}
                    label="Excluir"
                    onClick={() => {
                        let index = results.findIndex(x => x.id == params.id);
                        deletarAta(results[index].id);
                        console.log('Resultado selecionado excluir: ', results[index]);
                    }}
                    showInMenu
                />,
            ],
        },
    ]




    return (
        <>
            <Header getData={getData} />

            <EditModal 
                title='Editar Ata' 
                editModal={editModal} 
                setEditModal={setEditModal}
                id={editId} 
                uniqueKey={editUniqueKey}
                titulo={editTitulo} 
                descricao={editDescricao}
                revisada={editRevisada}
                dataCadastro={editdataCadastro}
            />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-12">
                        <DataGrid
                            autoHeight
                            disableSelectionOnClick
                            rows={results}
                            rowCount={totalRegistros}
                            loading={isLoading}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            pagination
                            page={page}
                            pageSize={pageSize}
                            paginationMode="server"
                            onPageChange={(newPage) => setPage(newPage)}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </>
    );






}