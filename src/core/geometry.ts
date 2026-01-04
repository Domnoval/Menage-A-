export type GeoType = 'Circle' | 'Line' | 'Point';

export interface GeoNode {
    id: string;
    type: GeoType;
    provenance: string[]; // IDs of parents
    resonance: number;   // Activation level (0-1)
    params: any;
}

export class GeometryEngine {
    nodes: Map<string, GeoNode> = new Map();

    constructor() { }

    addNode(node: GeoNode) {
        this.nodes.set(node.id, node);
    }

    getNode(id: string) {
        return this.nodes.get(id);
    }

    // Generative Methods
    createCircle(id: string, x: number, y: number, r: number): GeoNode {
        return {
            id,
            type: 'Circle',
            provenance: [],
            resonance: 1.0,
            params: { x, y, r }
        };
    }
}

export const engine = new GeometryEngine();
