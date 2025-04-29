/**
 * Base response interface that all API responses extend
 */
export interface BaseResponse {
    /** The identifier for an API request for error tracking */
    request_id: string;
    /** Error code if any error occurred */
    error: string;
    /** Error message if any error occurred */
    message: string;
}
