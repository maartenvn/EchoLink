import {EchoBuilder} from "./EchoBuilder";

/**
 * Builder
 */
export * from "./EchoBuilder";

/**
 * Types
 */
export * from "./types/EchoError";
export * from "./types/EchoPromise";
export * from "./types/EchoPromiseStatus";
export * from "./types/EchoRequest";
export * from "./types/EchoResponse";

/**
 * Default export
 */
export default () => new EchoBuilder();