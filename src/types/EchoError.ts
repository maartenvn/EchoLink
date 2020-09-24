import {AxiosError} from "axios";

export interface EchoError<T> extends AxiosError<T> {}