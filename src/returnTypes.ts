export type getRequest = {
    items: Array<any>;
    count: number;
}

export type databaseOperationResult = {
    result: any;
    errors: Array<any>;
}

export function convertToJson(data : getRequest) {
    return JSON.stringify(data);
}