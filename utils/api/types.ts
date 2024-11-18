/**
 * Response Data Type
 */
export type response<T> = {
    /**
     * Response Status
     */
    status: boolean

    /**
     * Response Message
     */
    message: string


    /**
     * Response Data
     *
     * This may be undefined if
     * the response did not carry
     * any data.
     */
    data?: T
}
