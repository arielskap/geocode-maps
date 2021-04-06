/* eslint-disable react/no-array-index-key */
import Layout from "@components/Layout"
import { useEffect, useState } from "react"

let WATCH_ID = NaN

const BigDataCloud: React.FC = () => {
	const [localidades, setLocalidades] = useState<string[]>( [] )
	const geoSuccess = async ( position: GeolocationPosition ) => {
		const result = await fetch( `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=es` ).then( ( result ) => {
			return result.json()
		} ).catch( ( e ) => {
			console.log( e )
		} ).then( ( result ) => {
			return result
		} )

		console.log( result )
		setLocalidades( ( prevState ) => [...prevState, `Pais: ${result.countryName},Ciudad: ${result.city}, Localidad: ${result.locality}`] )
	}

	const geoError = () => {
		alert( `No se pudo obtener la posicion` )
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

	useEffect( () => {
		if ( `geolocation` in navigator ) {
			true
		}
	}, [] )

	return (
		<Layout title="Big Data Cloud Api GeoCode">
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

export default BigDataCloud
