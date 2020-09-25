import axios from "axios";
import {EchoOptions} from "./types/EchoOptions";

export class EchoBuilder<T> {

    /**
     * Options.
     */
    private opts: EchoOptions = {};

    /**
     * (Optional) Constructor
     * @param options Request options
     */
    constructor(options?: EchoOptions) {
        this.opts = { ...options ?? {}};
    }

    /**
     * Set the base URL of the request.
     * @param baseUrl Base URL to send a request to
     */
    baseUrl(baseUrl: string): EchoBuilder<T> {
        this.opts.baseUrl = baseUrl;

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Set the URL of the request.
     * @param url URL to send a request to
     */
    url(url: string): EchoBuilder<T> {
        this.opts.url = url;

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Make the request a GET request.
     * @param url URL to send a request to
     */
    get(url: string): EchoBuilder<T> {
        this.opts.url = url;
        this.opts.method = "GET";

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Make the request a POST request.
     * @param url URL to send a request to
     */
    post(url: string): EchoBuilder<T> {
        this.opts.url = url;
        this.opts.method = "POST";

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Make the request a PATCH request.
     * @param url URL to send a request to
     */
    patch(url: string): EchoBuilder<T> {
        this.opts.url = url;
        this.opts.method = "PATCH";

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Make the request a PUT request.
     * @param url URL to send a request to
     */
    put(url: string): EchoBuilder<T> {
        this.opts.url = url;
        this.opts.method = "PUT";

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Make the request a DELETE request.
     * @param url URL to send a request to
     */
    delete(url: string): EchoBuilder<T> {
        this.opts.url = url;
        this.opts.method = "DELETE";

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Make the request a HEAD request.
     * @param url URL to send a request to
     */
    head(url: string): EchoBuilder<T> {
        this.opts.url = url;
        this.opts.method = "HEAD";

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Make the request a OPTIONS request.
     * @param url URL to send a request to
     */
    options(url: string): EchoBuilder<T> {
        this.opts.url = url;
        this.opts.method = "OPTIONS";

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Set the method of the request.
     * @param method Method of the request
     */
    method(method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD" | "OPTIONS"): EchoBuilder<T> {
        this.opts.method = method;

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Add a single header to the request.
     * @param name Name of the header
     * @param value Value of the header
     */
    header(name: string, value: string): EchoBuilder<T> {
        this.opts.headers = {...this.opts.headers, ...{[name]: value}}

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Add headers to the request.
     * @param headers Headers of the request.
     */
    headers(headers: HeadersInit): EchoBuilder<T> {
        this.opts.headers = {...this.opts.headers, ...headers};

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Add a single query parameter to the request.
     * (Alias for 'parameter')
     * @param name Name of the query parameter
     * @param value Value of the query parameter
     */
    parameter(name: string, value: string): EchoBuilder<T> {
        this.opts.parameters = {...this.opts.parameters, ...{[name]: value}}

        return new EchoBuilder<T>(this.opts);
    }


    /**
     * Set the query parameters of the request.
     * @param parameters Query parameters of the request.
     */
    parameters(parameters: { [key: string]: unknown }): EchoBuilder<T> {
        this.opts.parameters = {...this.opts.parameters, ...parameters};

        return new EchoBuilder<T>(this.opts);
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
        this.opts.url?.replace(new RegExp(`:${name}`, "g"), value);
        this.opts.url?.replace(new RegExp(`:\{${name}\}`, "g"), value);

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Set the body of the request.
     * @param body Body of the request
     */
    body(body: any): EchoBuilder<T> {
        this.opts.body = body;

        return new EchoBuilder<T>(this.opts);
    }

    /**
     * Fetch the data from the server with the constructed request.
     */
    execute(): Promise<T> {

        // Shorten options for ease of access
        const opts = this.opts;

        // Construct the URL
        let url = opts.baseUrl ? opts.baseUrl + opts.url : opts.url ?? "";

        // Construct the fetch request
        return axios(url, {
            method: opts.method ?? "GET",
            headers: opts.headers ?? [],
            data: JSON.stringify(opts.body)
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return err;
            });
    }
}