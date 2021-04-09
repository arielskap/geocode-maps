import { useEffect, useState } from "react"

let WATCH_ID = NaN
const GEO_OPTIONS = {
	enableHighAccuracy: true,
	maximumAge: 0,
	timeout: 10000
}

const useLocalidades = ( { parseUrl }: { parseUrl: ( position: GeolocationPosition ) => string } ) => {
	const [localidades, setLocalidades] = useState<string[]>( [] )
	const [fetchLocalidadResult, setFetchLocalidadResult] = useState<any>()

	const geoSuccess = async ( position: GeolocationPosition ) => {
		const urlParse = parseUrl( position )
		const result = await fetch( urlParse ).then( ( result ) => {
			return result.json()
		} ).catch( ( e ) => {
			console.log( e )
		} ).then( ( result ) => {
			return result
		} )

		console.log( result )
		setFetchLocalidadResult( result )
	}

	const geoError = () => {
		alert( `No se pudo obtener la posicion` )
	}

	const handleClickLocalidad = () => {
		if ( `geolocation` in navigator ) {
			WATCH_ID = navigator.geolocation.watchPosition( geoSuccess, geoError, GEO_OPTIONS )
		} else {
			alert( `Geolocalizacion no esta disponible` )
		}
	}

	useEffect( () => {
		if ( localidades.length > 3 ) {
			navigator.geolocation.clearWatch( WATCH_ID )
		}
		return navigator.geolocation.clearWatch( WATCH_ID )
	}, [localidades] )

	return {
		localidades, setLocalidades, handleClickLocalidad, fetchLocalidadResult
	}
}

export default useLocalidades