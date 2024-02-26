export interface ActivityRamp {
    id: string
    type: 'kyc-level-1' | 'kyc-level-2' | 'kyc-level-3' | 'pix-to-token'
    status: 'queued' | 'posted' | 'success' | 'error'
}