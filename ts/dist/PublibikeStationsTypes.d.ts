export interface Station {
    address?: string;
    capacity?: number;
    city?: string;
    id: number;
    is_virtual_station?: boolean;
    latitude: number;
    longitude: number;
    name: string;
    network: Record<string, any>;
    sponsors?: any[];
    state: Record<string, any>;
    vehicles?: any[];
    zip?: string;
}
export interface StationLoadMatch {
    id: number;
}
export interface StationListMatch {
    address?: string;
    capacity?: number;
    city?: string;
    id?: number;
    is_virtual_station?: boolean;
    latitude?: number;
    longitude?: number;
    name?: string;
    network?: Record<string, any>;
    sponsors?: any[];
    state?: Record<string, any>;
    vehicles?: any[];
    zip?: string;
}
