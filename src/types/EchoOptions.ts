export interface EchoOptions {

    /**
     * Base URL of the request.
     */
    baseUrl?: string;

    /**
     * URL of the request.
     */
    url?: string;

    /**
     * Method of the request.
     */
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD" | "OPTIONS";

    /**
     * Headers of the request.
     * @key Name of the header
     * @value Value for that header
     */
    headers?: HeadersInit;

    /**
     * Query parameters of the request.
     * @key Name of the query parameter
     * @value Value for that query parameter
     */
    parameters?: { [key: string]: unknown };

    /**
     * Body of the request.
     */
    body?: { [key: string]: unknown } | unknown;
}