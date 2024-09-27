// netboxjs.d.ts
declare module 'netboxjs' {
  import { AxiosRequestConfig, AxiosResponse } from 'axios';

  interface NetboxOptions {
    host: string;
    token: string;
  }

  class Netbox {
    constructor(options: NetboxOptions);

    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    put(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;

    options: NetBoxClientOptions;

    getTenants(params?: PaginationOptions): Promise<GetTenantsResponse>;

    getInterfaces(params?: PaginationOptions): Promise<GetInterfacesResponse>;
    createInterface(data: CreateInterfaceData): Promise<Interface>;

    getIPAddresses(params?: PaginationOptions): Promise<GetIPAddressesResponse>;
    getAvailableIPs(prefix: string, data?: Record<string, any>): Promise<AvailableIPResponse>;
    createNextIPAddress(prefix: string, data: Record<string, any>): Promise<IPAddress>;
    createIPAddress(data: CreateIPAddressData): Promise<IPAddress>;
    updateIPAddress(data: UpdateIPAddressData): Promise<IPAddress>;

    getVirtualMachines(params?: Record<string, any>): Promise<GetVirtualMachinesResponse>;
    createVirtualMachine(data: CreateVirtualMachineData): Promise<VirtualMachine>;
    updateVirtualMachine(data: UpdateVirtualMachineData): Promise<VirtualMachine>;

    getVlans(params?: Record<string, any>): Promise<GetVlansResponse>;

  }

  export interface NetBoxClientOptions {
    url: string;                 // Basis-URL der NetBox API
    token?: string;             // Optionales Token für die Authentifizierung
    defaultParams?: Record<string, any>; // Standard-Parameter für API-Anfragen
  }

  export interface PaginationOptions {
    limit?: number;             // Maximale Anzahl an Ergebnissen pro Seite
    offset?: number;            // Offset für die Paginierung
  }

  export interface Tenant {
    id: number;                 // Eindeutige ID des Mieters
    name: string;               // Name des Mieters
    // Füge weitere Eigenschaften hinzu, die relevant sind
  }

  export interface GetTenantsResponse {
    count: number;              // Anzahl der gefundenen Mietern
    next: string | null;        // URL für die nächste Seite der Ergebnisse
    previous: string | null;    // URL für die vorherige Seite der Ergebnisse
    results: Tenant[];          // Array von Mietern
  }


  export interface Interface {
    id: number;                    // Eindeutige ID des Interfaces
    name: string;                  // Name des Interfaces
    type: string;                  // Typ des Interfaces
    // Füge weitere Eigenschaften hinzu, die relevant sind
  }

  export interface GetInterfacesResponse {
    count: number;                 // Anzahl der gefundenen Interfaces
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
    results: Interface[];          // Array von Interfaces
  }

  export interface CreateInterfaceData {
    name: string;                  // Name des zu erstellenden Interfaces
    type: string;                  // Typ des zu erstellenden Interfaces
    // Füge weitere erforderliche Eigenschaften hinzu
  }

export interface IPAddress {
    id: number;                    // Eindeutige ID der IP-Adresse
    address: string;               // Die IP-Adresse
    status: string;                // Status der IP-Adresse (z.B. "active", "reserved")
    // Weitere relevante Eigenschaften
  }

  export interface GetIPAddressesResponse {
    count: number;                 // Anzahl der gefundenen IP-Adressen
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
    results: IPAddress[];          // Array von IP-Adressen
  }

  export interface AvailableIPResponse {
    available_ips: string[];       // Liste der verfügbaren IP-Adressen
  }

  export interface CreateIPAddressData {
    address: string;               // Die zu erstellende IP-Adresse
    status?: string;               // Optionaler Status der IP-Adresse
    // Weitere erforderliche Eigenschaften hinzufügen
  }

  export interface UpdateIPAddressData {
    id: number;                    // ID der zu aktualisierenden IP-Adresse
    address?: string;              // Neue IP-Adresse (optional)
    status?: string;               // Neuer Status (optional)
    // Weitere aktualisierbare Eigenschaften hinzufügen
  }

export interface VirtualMachine {
    id: number;                    // Eindeutige ID der virtuellen Maschine
    name: string;                  // Name der virtuellen Maschine
    status: string;                // Status der virtuellen Maschine (z.B. "active", "stopped")
    // Weitere relevante Eigenschaften
  }

  export interface GetVirtualMachinesResponse {
    count: number;                 // Anzahl der gefundenen virtuellen Maschinen
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
    results: VirtualMachine[];     // Array von virtuellen Maschinen
  }

  export interface CreateVirtualMachineData {
    name: string;                  // Name der zu erstellenden virtuellen Maschine
    status?: string;               // Optionaler Status der virtuellen Maschine
    // Weitere erforderliche Eigenschaften hinzufügen
  }

  export interface UpdateVirtualMachineData {
    id: number;                    // ID der zu aktualisierenden virtuellen Maschine
    name?: string;                 // Neuer Name (optional)
    status?: string;               // Neuer Status (optional)
    // Weitere aktualisierbare Eigenschaften hinzufügen
  }

  export interface Vlan {
    id: number;                    // Eindeutige ID des VLANs
    name: string;                  // Name des VLANs
    vid: number;                   // VLAN ID
    // Weitere relevante Eigenschaften
  }

  export interface GetVlansResponse {
    count: number;                 // Anzahl der gefundenen VLANs
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
    results: Vlan[];               // Array von VLANs
  }

  export = Netbox;
}
