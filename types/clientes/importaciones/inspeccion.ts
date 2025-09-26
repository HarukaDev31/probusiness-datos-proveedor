/**code_supplier
: 
"SACR6"
excel_confirmacion
: 
"https://intranet.probusiness.pe/assets/images/agentecompra/1747432126_Excel%20de%20Confirmaci%C3%B3n%20Sarita%20ok.xlsx"
factura_comercial
: 
"https://intranet.probusiness.pe/assets/images/agentecompra/1747432126_1742257505_1980%20SARITA%20OK.xlsx"
id
: 
343
packing_list
: 
"https://intranet.probusiness.pe/assets/images/agentecompra/1747432126_Packing%20List%20Sarita%20ok.xlsx"
valor_doc
: 
1444.29
volumen_doc
: 
0.66 */
export interface Provider {
    code_supplier: string
    excel_confirmacion: string
    factura_comercial: string
    id: number
    packing_list: string
    valor_doc: number
    volumen_doc: number
}
interface Inspeccion{
    id: number
    providers: Provider[]
    files_almacen_inspection: FileAlmacenInspection[]
}
export interface InspeccionResponse {
    data: Inspeccion
    success: boolean
}

export interface FileAlmacenInspection{
    id: number
    file_name: string
    file_url: string
    file_ext: string
    id_proveedor: number
}