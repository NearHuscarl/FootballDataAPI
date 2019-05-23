export default interface APIHeader {
    version: string;
    client: string;
    secLeftUntilReset: number;
    remainingRequests: number;
}
