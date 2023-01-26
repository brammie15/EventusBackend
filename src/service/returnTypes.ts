export type getRequest = {
    items: Array<any>;
    count: number;
}

export function convertToJson(data : getRequest) {
    return JSON.stringify(data);
}