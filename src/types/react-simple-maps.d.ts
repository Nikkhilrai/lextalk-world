declare module 'react-simple-maps' {
    import { ComponentType, ReactNode, CSSProperties } from 'react';

    interface ComposableMapProps {
        projection?: string;
        projectionConfig?: {
            scale?: number;
            center?: [number, number];
            rotate?: [number, number, number];
        };
        width?: number;
        height?: number;
        children?: ReactNode;
    }

    interface GeographiesProps {
        geography: string | object;
        children: (props: { geographies: Geography[] }) => ReactNode;
    }

    interface Geography {
        rsmKey: string;
        properties: Record<string, any>;
        geometry: any;
    }

    interface GeographyProps {
        geography: Geography;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        style?: {
            default?: CSSProperties;
            hover?: CSSProperties;
            pressed?: CSSProperties;
        };
    }

    interface MarkerProps {
        coordinates: [number, number];
        children?: ReactNode;
    }

    export const ComposableMap: ComponentType<ComposableMapProps>;
    export const Geographies: ComponentType<GeographiesProps>;
    export const Geography: ComponentType<GeographyProps>;
    export const Marker: ComponentType<MarkerProps>;
}
