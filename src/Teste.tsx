import React from "react";
import axios from "axios";
import { DataGrid, GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Teste() {

    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [results, setResults] = React.useState<any[]>([]);
    const [totalRegistros, setTotalRegistros] = React.useState(0);

    const columns: GridColumns = [
        {
            field: 'id', headerName: '#ID', sortable: false, disableColumnMenu: true, renderCell(params) {
                return params.row.uniqueKey;
            },
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
                    onClick={() => {
                        let index = results.findIndex(x => x.id == params.id);
                        console.log('Resultado selecionado editar: ', results[index]);
                    }}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon className="text-danger" />}
                    label="Excluir"
                    //onClick={deleteUser(params.id)}
                    onClick={() => {
                        let index = results.findIndex(x => x.id == params.id);
                        console.log('Resultado selecionado excluir: ', results[index]);
                    }}
                    showInMenu
                />,
            ],
        },
    ];

    React.useEffect(() => {
        getDataGrid();
    }, [page, pageSize]);



    function getDataGrid(): void {
        if (isLoading) return;
        if (!isLoading) setIsLoading(true);
        let currentPage = page + 1;
        let filtrosApi: string = '';
        //let filtrosApi: string = filters;
        // if(ordenacao.trim() !== ''){
        //     filtrosApi = filters.replace('?','').trim() !== '' ? `${filters}&${ordenacao}` : `?${ordenacao}`;
        // }

        TesteService.listar(currentPage, pageSize, filtrosApi).then((response) => {
            if (response.data.errorCode != 0) {
                //Exibir mensagem da api
                //showAlertMessage(response.data.errorMessage,true,true);
                setResults([]);
                setTotalRegistros(0);
            }
            else {
                setTotalRegistros(response.data.totalRegistros);
                setResults(response.data.results);
            }
        })
            .catch((err) => {
                //Exibir mensagem de falha
                //showAlertMessage('Não foi possível obter os dados. Falha na comunicação com o servidor.',true,true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <>
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






export class TesteService {

    public static async listar(pagina: number, registrosPagina: number = 10, filtros: string = ''): Promise<any> {
        const requestUrl = `https://apicore.goutron.com/api/v1/ata/listar/${pagina}/${registrosPagina}${filtros}`;
        const heads = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };
        return axios.get(requestUrl, heads);
    }
}