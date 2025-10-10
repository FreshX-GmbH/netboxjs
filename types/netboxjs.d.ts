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

    getTenants(params?: Record<string,any>, query?: string): Promise<GetTenantsResponse>;
    getTenant(query: string): Promise<GetTenantsResponse>;

    getInterfaces(params?: PaginationOptions): Promise<GetInterfacesResponse>;
    createInterface(data: CreateInterfaceData): Promise<Interface>;

    getIPAddresses(params?: PaginationOptions): Promise<GetIPAddressesResponse>;
    getIPAddress(address: string): Promise<GetIPAddressResponse>;
    getAvailableIPs(prefix: string, data?: Record<string, any>): Promise<AvailableIPResponse>;
    getPrefix(prefix: string): Promise<GetIPAddressResponse>;
    createNextIPAddress(prefix: number, data: Record<string, any>): Promise<IPAddress>;
    createIPAddress(data: CreateIPAddressData): Promise<IPAddress>;
    updateIPAddress(data: UpdateIPAddressData): Promise<IPAddress>;

    getVirtualMachines(params?: Record<string, any>, query:string): Promise<GetVirtualMachinesResponse>;
    createVirtualMachine(data: CreateVirtualMachineData): Promise<VirtualMachine>;
    updateVirtualMachine(data: UpdateVirtualMachineData): Promise<VirtualMachine>;

    getVlans(params?: string): Promise<GetVlansResponse>;

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
    id: number;
    name: string;
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

  export interface UpdateVirtualMachineData {
      id: number,
      name?: string; // Name der VM
      status?: 'active' | 'offline' | 'planned' | 'staged' | 'failed' | 'decommissioning'; // Status der VM
      site?: number | null; // ID der Site
      cluster?: number | null; // ID des Clusters
      primary_ip4?: number | null; // ID der primären IPv4-Adresse
      primary_ip6?: number | null; // ID der primären IPv6-Adresse
      tenant?: number | null; // ID des Tenants
      role?: number | null; // ID der Rolle
      vcpus?: number | null; // Anzahl der vCPUs
      memory?: number | null; // RAM in MB
      disk?: number | null; // Festplattenspeicher in GB
      comments?: string; // Kommentare
      tags?: { id: number; name: string; slug: string }[]; // Tags
      custom_fields?: { [key: string]: any };
  }

  export interface GetVirtualMachinesResponse extends AxiosResponse {
    count: number;                 // Anzahl der gefundenen virtuellen Maschinen
    next: string | null;           // URL für die nächste Seite der Ergebnisse
    previous: string | null;       // URL für die vorherige Seite der Ergebnisse
  }

  export interface CreateVirtualMachineData {
  name: string;                 // Pflichtfeld: Name der VM
  cluster?: Cluster;    // ID oder eindeutiger Name des Clusters
  site?: number | string;       // optional: Standort (Site)
  device?: number | string;     // Hostgerät (physischer Host), falls relevant
  vcpus?: number;                // Anzahl vCPUs (kann auch Float sein)
  memory?: number;               // Arbeitsspeicher in MiB
  disk?: number;                 // Gesamtgröße der Disks (in MiB oder GiB, je API)
  serial?: string;               // Seriennummer optional
  description?: string;          // Beschreibung
  status?: string;               // Status, z. B. "active", "stopped" etc.
  role?: Role;
  platform?: Platform;
  tags?: string[];               // Tags
  tenant?: any;      // Tenant ID oder Name
  primary_ip4?: string;          // z. B. "192.168.1.10/24"
  primary_ip6?: string;          // z. B. "2001:db8::1/64"
  local_context_data?: Record<string, any>; // kontextspezifische Daten (JSON)
  custom_fields?: Record<string, any>;     // benutzerdefinierte Felder
  virtual_machine_role?: number | string;  // Rolle der VM, falls modelliert
  headers?: Record<string, string>;         // optionale Headers (z.B. zusätzliche Auth)
  // Falls du Query-Parameter übergeben willst (z. B. filtering etc.)
  query_params?: Record<string, string | number | boolean>;
}

  export interface UpdateIPAdressData {
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
    label?: string;
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
    url?: string;
    display?: string;
    name?: string;
}

export interface Role {
    id: number;
    url?: string;
    display?: string;
    name?: string;
    slug?: string;
}

export interface Platform {
    id: number;
    url?: string;
    display?: string;
    name?: string;
    slug?: string;
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
