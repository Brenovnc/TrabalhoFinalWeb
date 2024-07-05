import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';

const Map = ({ apikey }) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

    useEffect(() => {
        // Check if the map object has already been created
        if (!map.current) {
            // Create a platform object with the API key and useCIT option
            platform.current = new H.service.Platform({
                apikey
            });
            // Obtain the default map types from the platform object:
            const defaultLayers = platform.current.createDefaultLayers({
                pois: true
            });
            // Create a new map instance with the Tile layer, center and zoom level
            // Instantiate (and display) a map:
            const newMap = new H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map, {
                    zoom: 5,
                    center: {
                        lat: -18.5122,
                        lng: -44.5550,
                    },
                }
            );

            // Add panning and zooming behavior to the map
            const behavior = new H.mapevents.Behavior(
                new H.mapevents.MapEvents(newMap)
            );

            // Set the map object to the reference
            map.current = newMap;
        }
    }, [apikey]);

    // Return a div element to hold the map
    return <div class="divEnvolveMapa">
                <div class="mapa" ref={mapRef}></div>
            </div>
}

export default Map;