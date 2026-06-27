declare module 'indo-data-faker' {
  export interface IdentityOptions {
    provinsi?: string;
    kota?: string;
  }

  export interface Identity {
    id: string;
    nik: string;
    nama_lengkap: string;
    email: string;
    telepon: string;
    alamat: string;
    npwp: string;
    agama: string;
    kewarganegaraan: string;
    status_perkawinan: string;
    rekening_bank: string;
    e_wallet: string;
    kendaraan_plat: string;
  }

  export interface HoneypotOptions {
    amount?: number;
  }

  export function generateNIK(): string;
  export function generateNamaIndo(): string;
  export function generateTelepon(): string;
  export function generateAlamat(options?: IdentityOptions): string;
  export function generateNPWP(): string;
  export function generateRekeningBank(): string;
  export function generateEWallet(): string;
  export function generatePlatNomor(): string;
  export function generateIdentity(options?: IdentityOptions): Identity;
  
  export function generateHoneypotData(count?: number): Identity[];
  export function honeypotTrap(options?: HoneypotOptions): any; // Express Middleware

  export function exportToCSV(filename: string, data: any[]): void;
  export function exportToSQL(tableName: string, filename: string, data: any[]): void;
}
