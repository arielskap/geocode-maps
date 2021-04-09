/* eslint-disable react/no-array-index-key */
import Layout from "@components/Layout"
import useGeolocation from "hooks/useGeolocation"
import useLocalidades from "hooks/useLocalidades"
import { useEffect } from "react"

const parseUrl = ( position: GeolocationPosition ) => {
	return `https://api.positionstack.com/v1/reverse?access_key=9acf23729daceb4a4f323978584cf95e&query=${position.coords.latitude},${position.coords.longitude}`
}

const PositioNStack: React.FC = () => {
	const { localidades, setLocalidades, handleClickLocalidad, fetchLocalidadResult } = useLocalidades( { parseUrl } )
	const [ geolocation ] = useGeolocation()

	useEffect( () => {
		if ( fetchLocalidadResult ) {
			setLocalidades( ( prevState ) => [...prevState, fetchLocalidadResult.data[0].label] )
		}
	}, [fetchLocalidadResult] )

	return (
		<Layout title="Position Stack Api GeoCode">
			<div className='flex flex-col items-center justify-center h-screen'>
				<button disabled={!geolocation} className='px-2 py-1 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800' type='button' onClick={handleClickLocalidad}>Obtener posicion actual</button>
				{localidades && localidades.map( ( localidad, i ) => {
					return (
						<p key={`localidad-${i}`}>Localidad {i + 1}: {localidad}</p>
					)
				} )}
			</div>
		</Layout>
	)
}

export default PositioNStack