import { useState } from "react"

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
		alert( `Active la geolocalización y recargue la pagina para continuar...` )
	}

	const handleClickLocalidad = () => {
		if ( `geolocation` in navigator ) {
			navigator.geolocation.getCurrentPosition( geoSuccess, geoError, GEO_OPTIONS )
		} else {
			alert( `Geolocalizacion no esta disponible` )
		}
	}

	return {
		localidades, setLocalidades, handleClickLocalidad, fetchLocalidadResult
	}
}

export default useLocalidades