import {EchoPromiseStatus} from "./EchoPromiseStatus";
import {EchoResponse} from "./EchoResponse";
import {EchoError} from "./EchoError";
import {EchoRequest} from "./EchoRequest";

export interface EchoPromise<T> extends Promise<T> {

    /**
     * Status of the request.
     */
    status: EchoPromiseStatus;

    /**
     * Fetch request that was originally send.
     */
    request: EchoRequest;

    /**
     * Response received on a successful request.
     */
    response?: EchoResponse<T>;

    /**
     * Data received on a successful request.
     */
    data?: T;

    /**
     * Error received on a failed request.
     */
    error?: EchoError<T>;

    /**
     * Get if the request is loading.
     */
    isLoading(): boolean;

    /**
     * Get if the request is successful.
     */
    isSuccess(): boolean;

    /**
     * Get if the request failed.
     */
    isError(): boolean;

    /**
     * Convert the optional data object to an actual data object.
     * @throws Error when undefined.
     */
    requireData(): T;

    /**
     * Convert the optional response object to an actual response object.
     * @throws Error when undefined.
     */
    requireResponse(): EchoResponse<T>;

    /**
     * Convert the optional error object to an actual error object.
     * @throws Error when undefined.
     */
    requireError(): EchoError<T>;
}