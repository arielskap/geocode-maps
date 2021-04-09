/* eslint-disable react/no-array-index-key */
import Layout from "@components/Layout"
import { useEffect, useState } from "react"

let WATCH_ID = NaN

const ApiGeo: React.FC = () => {
	const [localidades, setLocalidades] = useState<string[]>( [] )
	const CREDENTAIL = `AIzaSyABgPY5wxzg0FK0goBCQfGkkLoN2Vsvz3I`

	const formatLocation = ( {latitude, longitude}: {latitude: number, longitude: number} ) => {
		return `${latitude}, ${longitude}`
	}

	const geoSuccess = async ( position: GeolocationPosition ) => {
		const location = formatLocation( position.coords )
		const result = await fetch( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location}&key=${CREDENTAIL}`, {
			method: `POST`
		} ).then( ( result ) => {
			return result.json()
		} ).catch( ( e ) => {
			console.log( e )
		} ).then( ( result ) => {
			return result
		} )

		console.log( result )
		setLocalidades( ( prevState ) => [...prevState, result.results[0].formatted_address] )
	}

	const geoError = () => {
		alert( `Active la geolocalización y recargue la pagina para continuar...` )
	}

	const handleClickLocalidad = () => {
		if ( `geolocation` in navigator ) {
			const geoOptions = {
				enableHighAccuracy: true,
				maximumAge: 0,
				timeout: 10000
			}

			// navigator.geolocation.getCurrentPosition( geoSuccess, geoError, geoOptions )
			WATCH_ID = navigator.geolocation.watchPosition( geoSuccess, geoError, geoOptions )
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

	return (
		<Layout title="Api google y nativo">
			<div className='flex flex-col items-center justify-center h-screen'>
				<button className='px-2 py-1 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800' type='button' onClick={handleClickLocalidad}>Obtener posicion actual</button>
				{localidades.map( ( localidad, i ) => {
					return (
						<p key={`localidad-${i}`}>Localidad {i + 1}: {localidad}</p>
					)
				} )}
			</div>
		</Layout>
	)
}

export default ApiGeo
