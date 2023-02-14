import axios from 'axios';


export class AtaService {

    public static async listar(pagina: number, registrosPagina: number = 10, filtros: string = ''): Promise<any> {
        const requestUrl = `https://apicore.goutron.com/api/v1/ata/listar/${pagina}/${registrosPagina}?titulo=${filtros}`;
        const heads = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };
        return axios.get(requestUrl, heads);
    }


    public static async obter(id: number): Promise<any> {

        const requestUrl = `https://apicore.goutron.com/api/v1/ata/obter/${id}`;
        const heads = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

        return axios.get(requestUrl, heads);

    }


    public static async editar(body: any): Promise<any> {

        const requestUrl = `https://apicore.goutron.com/api/v1/ata/salvar`;
        const heads = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

        return axios.post(requestUrl, body, heads);

    }

    
    public static async nova(body: any): Promise<any> {

        const requestUrl = `https://apicore.goutron.com/api/v1/ata/salvar`;
        const heads = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

        return axios.post(requestUrl, body, heads);

    }


    public static async deletar(id: number): Promise<any> {

        const requestUrl = `https://apicore.goutron.com/api/v1/ata/excluir/${id}`;
        const heads = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

        return axios.delete(requestUrl, heads);

    }
}

