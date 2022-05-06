
export interface ResponseModel {
    status?: number,
    body?: {
        success?: boolean,
        err?: any,
        result?: any
    }
}