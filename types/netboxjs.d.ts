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

  export interface GetTenantsResponse extends AxiosResponse {
    count: number;              // Anzahl der gefundenen Mietern
    next: string | null;        // URL für die nächste Seite der Ergebnisse
    previous: string | null;    // URL für die vorherige Seite der Ergebnisse
  }


  export interface Interface {
    id: number;                    // Eindeutige ID des Interfaces
    name: string;                  // Name des Interfaces
    type: string;                  // Typ des Interfaces
    // Füge weitere Eigenschaften hinzu, die relevant sind
  }

  export interface GetInterfacesResponse extends AxiosResponse {
    count: number;                 // Anzahl der gefundenen Interfaces
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
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

  export interface GetIPAddressesResponse extends AxiosResponse {
    count: number;                 // Anzahl der gefundenen IP-Adressen
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
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

  export interface GetVirtualMachinesResponse extends AxiosResponse {
    count: number;                 // Anzahl der gefundenen virtuellen Maschinen
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
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

  export interface GetVlansResponse extends AxiosResponse {
    count: number;                 // Anzahl der gefundenen VLANs
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
  }

export interface Tag {
    id: number;
    url: string;
    display: string;
    name: string;
    slug: string;
    color: string;
}

export interface TenantGroup {
    id: number;
    url: string;
    display: string;
    name: string;
    slug: string;
    _depth: number;
}

export interface Tenant {
    id: number;
    url: string;
    display: string;
    name: string;
    slug: string;
    group: TenantGroup;
    description: string;
    comments: string;
    tags: Tag[];
    custom_fields: Record<string, unknown>;
    created: string;
    last_updated: string;
    circuit_count: number;
    device_count: number;
    ipaddress_count: number;
    prefix_count: number;
    rack_count: number;
    site_count: number;
    virtualmachine_count: number;
    vlan_count: number;
    vrf_count: number;
    cluster_count: number;
}

export interface Status {
    value: string;
    label: string;
}

export interface Site {
    id: number;
    url: string;
    display: string;
    name: string;
    slug: string;
}

export interface Cluster {
    id: number;
    url: string;
    display: string;
    name: string;
}

export interface Role {
    id: number;
    url: string;
    display: string;
    name: string;
    slug: string;
}

export interface Platform {
    id: number;
    url: string;
    display: string;
    name: string;
    slug: string;
}

export interface PrimaryIP {
    id: number;
    url: string;
    display: string;
    family: number;
    address: string;
}

export interface VirtualMachine {
    id: number;
    url: string;
    display: string;
    name: string;
    ref: string;
    status: Status;
    site: Site;
    cluster: Cluster;
    device: string | null;
    role: Role;
    tenant: Tenant
    tags: Tag[];
}

  export = Netbox;
}
