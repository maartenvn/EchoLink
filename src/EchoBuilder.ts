import {EchoRequest} from "./types/EchoRequest";
import axios from "axios";

export class EchoBuilder<T> {

    /**
     * Request to send.
     */
    private request: EchoRequest = {};

    /**
     * Set the base URL of the request.
     * @param baseUrl Base URL to send a request to
     */
    baseUrl(baseUrl: string): EchoBuilder<T> {
        this.request.baseUrl = baseUrl;

        return this;
    }

    /**
     * Set the URL of the request.
     * @param url URL to send a request to
     */
    url(url: string): EchoBuilder<T> {
        this.request.url = url;

        return this;
    }

    /**
     * Make the request a GET request.
     * @param url URL to send a request to
     */
    get(url: string): EchoBuilder<T> {
        this.request.url = url;
        this.request.method = "GET";

        return this;
    }

    /**
     * Make the request a POST request.
     * @param url URL to send a request to
     */
    post(url: string): EchoBuilder<T> {
        this.request.url = url;
        this.request.method = "POST";

        return this;
    }

    /**
     * Make the request a PATCH request.
     * @param url URL to send a request to
     */
    patch(url: string): EchoBuilder<T> {
        this.request.url = url;
        this.request.method = "PATCH";

        return this;
    }

    /**
     * Make the request a PUT request.
     * @param url URL to send a request to
     */
    put(url: string): EchoBuilder<T> {
        this.request.url = url;
        this.request.method = "PUT";

        return this;
    }

    /**
     * Make the request a DELETE request.
     * @param url URL to send a request to
     */
    delete(url: string): EchoBuilder<T> {
        this.request.url = url;
        this.request.method = "DELETE";

        return this;
    }

    /**
     * Make the request a HEAD request.
     * @param url URL to send a request to
     */
    head(url: string): EchoBuilder<T> {
        this.request.url = url;
        this.request.method = "HEAD";

        return this;
    }

    /**
     * Make the request a OPTIONS request.
     * @param url URL to send a request to
     */
    options(url: string): EchoBuilder<T> {
        this.request.url = url;
        this.request.method = "OPTIONS";

        return this;
    }

    /**
     * Set the method of the request.
     * @param method Method of the request
     */
    method(method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD" | "OPTIONS"): EchoBuilder<T> {
        this.request.method = method;

        return this;
    }

    /**
     * Add a single header to the request.
     * @param name Name of the header
     * @param value Value of the header
     */
    header(name: string, value: string): EchoBuilder<T> {
        this.request.headers = {...this.request.headers, ...{[name]: value}}

        return this;
    }

    /**
     * Add headers to the request.
     * @param headers Headers of the request.
     */
    headers(headers: HeadersInit): EchoBuilder<T> {
        this.request.headers = {...this.request.headers, ...headers};

        return this;
    }

    /**
     * Add a single query parameter to the request.
     * (Alias for 'parameter')
     * @param name Name of the query parameter
     * @param value Value of the query parameter
     */
    parameter(name: string, value: string): EchoBuilder<T> {
        this.request.parameters = {...this.request.parameters, ...{[name]: value}}

        return this;
    }


    /**
     * Set the query parameters of the request.
     * @param parameters Query parameters of the request.
     */
    parameters(parameters: { [key: string]: unknown }): EchoBuilder<T> {
        this.request.parameters = {...this.request.parameters, ...parameters};

        return this;
    }

    /**
     * Add a single query parameter to the request.
     * (Alias for 'parameter')
     * @param name Name of the query parameter
     * @param value Value of the query parameter
     */
    query(name: string, value: string): EchoBuilder<T> {
        return this.parameter(name, value);
    }

    /**
     * Set the query parameters of the request.
     * (Alias for 'parameters')
     * @param queries Query parameters of the request
     */
    queries(queries: { [key: string]: unknown }): EchoBuilder<T> {
        return this.parameters(queries);
    }

    /**
     * Replace a path parameter placeholder in the url with a value.
     * A path placeholder can either be {name} or :name
     * @param name Name of the path parameter placeholder
     * @param value Value to replace the placeholder with
     */
    path(name: string, value: string): EchoBuilder<T> {
        this.request.url?.replace(new RegExp(`:${name}`, "g"), value);
        this.request.url?.replace(new RegExp(`:\{${name}\}`, "g"), value);

        return this;
    }

    /**
     * Set the body of the request.
     * @param body Body of the request
     */
    body(body: any): EchoBuilder<T> {
        this.request.body = body;

        return this;
    }

    /**
     * Fetch the data from the server with the constructed request.
     */
    execute(): Promise<T> {

        // Shorten Request for ease of access
        const req = this.request;

        // Construct the URL
        let url = req.baseUrl ? req.baseUrl + req.url : req.url ?? "";

        // Construct the fetch request
        return axios(url, {
            method: req.method ?? "GET",
            headers: req.headers ?? [],
            data: JSON.stringify(req.body)
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return err;
            });
    }
}