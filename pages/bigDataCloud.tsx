/* eslint-disable react/no-array-index-key */
import Layout from "@components/Layout"
import useLocalidades from "hooks/useLocalidades"
import { useEffect } from "react"

const parseUrl = ( position: GeolocationPosition ) => {
	return `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=es`
}

const BigDataCloud: React.FC = () => {
	const { localidades, setLocalidades, handleClickLocalidad, fetchLocalidadResult } = useLocalidades( { parseUrl } )

	useEffect( () => {
		if ( fetchLocalidadResult ) {
			setLocalidades( ( prevState ) => [...prevState, `Pais: ${fetchLocalidadResult.countryName},Ciudad: ${fetchLocalidadResult.city}, Localidad: ${fetchLocalidadResult.locality}`] )
		}
	}, [fetchLocalidadResult] )

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
