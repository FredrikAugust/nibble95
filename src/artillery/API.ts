export const CLIENT_ID = encodeURIComponent(process.env.REACT_APP_CLIENT_ID!);
export const CLIENT_SECRET = encodeURIComponent(process.env.REACT_APP_CLIENT_SECRET!);
const API_BASE = process.env.REACT_APP_API_BASE!;

export const AUTHORIZE_URI = `${API_BASE}/auth/`;
export const REGISTER_RFID_URI = `${API_BASE}/rfid/`;
export const INVENTORY_URI = `${API_BASE}/inventory/`;
export const BALANCE_URI = `${API_BASE}/transactions/`; // Update balance
export const TRANSACTION_URI = `${API_BASE}/orderline/`; // purchase item
export const LOGIN_URI = (rfid: string) => `${API_BASE}/usersaldo/?rfid=${rfid}`;
export const IMAGE_URI = (sm: string) => `https://online.ntnu.no/${sm}`;

export interface LoginResponse {
    count: number;
    next: any;
    previous: any;
    results: Array<{
      pk: number;
      first_name: string;
      last_name: string;
      saldo: number;
    }>;
}
