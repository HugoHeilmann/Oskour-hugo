const API_BASE = '/api';

export const ENDPOINTS = {
    // ------------------------
    // ITEMS (boisson / plat / dessert)
    // ------------------------

    /**
     * GET /items
     */
    getItems: () => `${API_BASE}/items`,

    /**
     * GET /items/{itemId}
     */
    getItemById: (itemId: string | number) => `${API_BASE}/items/${itemId}`,

    // ------------------------
    // ROOMS
    // ------------------------

    /**
     * GET /rooms
     */
    getRooms: () => `${API_BASE}/rooms`,

    /**
     * GET /rooms/{roomId}
     */
    getRoomById: (roomId: string | number) => `${API_BASE}/rooms/${roomId}`,

    /**
     * GET /rooms/{roomId}/tables
     */
    getTablesForRoom: (roomId: string | number) => `${API_BASE}/rooms/${roomId}/tables`,

    // ------------------------
    // TABLES
    // ------------------------

    /**
     * GET /tables
     */
    getTables: () => `${API_BASE}/tables`,

    /**
     * GET /tables/{tableId}
     */
    getTableById: (tableId: string | number) => `${API_BASE}/tables/${tableId}`,

    // ------------------------
    // PAYMENTS
    // ------------------------

    /**
     * GET /payment-methods
     */
    getPaymentMethods: () => `${API_BASE}/payment-methods`,

    /**
     * GET /payments
     */
    getPayments: () => `${API_BASE}/payments`,

    /**
     * POST /payments
     */
    createPayment: () => `${API_BASE}/payments`,

    /**
     * GET /payments/{paymentId}
     */
    getPaymentById: (paymentId: string | number) => `${API_BASE}/payments/${paymentId}`,

    /**
     * PATCH /payments/{paymentId}
     */
    updatePaymentStatus: (paymentId: string | number) => `${API_BASE}/payments/${paymentId}`,
} as const;