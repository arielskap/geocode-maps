import { useEffect, useState } from "react"

const Google = () => {
	const [localidad, setLocalidad] = useState( `` )
	const CREDENTAIL = `AIzaSyABgPY5wxzg0FK0goBCQfGkkLoN2Vsvz3I`

	const handleClickLocalidad = async () => {
		const formatLocation = ( {lat, lng} ) => {
			return `${lat}, ${lng}`
		}
		const geoLocation = await fetch( `https://www.googleapis.com/geolocation/v1/geolocate?key=${CREDENTAIL}`, {
			method: `POST`
		} ).then( ( result ) => {
			return result.json()
		} ).catch( ( e ) => {
			console.log( e )
		} ).then( ( result ) => {
			console.log( `geolocate`, result )
			return result
		} )

		const location = formatLocation( geoLocation.location )

		const result = await fetch( `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location}&key=${CREDENTAIL}`, {
			method: `POST`
		} ).then( ( result ) => {
			return result.json()
		} ).catch( ( e ) => {
			console.log( e )
		} ).then( ( result ) => {
			console.log( result )
			return result
		} )

		console.log( result )
		setLocalidad( result.results[0].formatted_address )
	}

	return (
		<div className='text-center'>
			<button className='px-2 py-1 mt-4 text-white bg-blue-600 rounded' type='button' onClick={handleClickLocalidad}>Obtener posicion actual</button>
			<p className='px-2 py-1 mt-4 bg-gray-300 rounded'>Posición actual: {localidad}</p>
		</div>
	)
}

export default Google
