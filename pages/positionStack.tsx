/* eslint-disable react/no-array-index-key */
import Layout from "@components/Layout"
import useLocalidades from "hooks/useLocalidades"
import React, { useEffect, useState } from "react"

const parseUrl = ( position: GeolocationPosition ) => {
	return `https://api.positionstack.com/v1/reverse?access_key=9acf23729daceb4a4f323978584cf95e&query=${position.coords.latitude},${position.coords.longitude}`
}

const PositioNStack: React.FC = () => {
	const { localidades, setLocalidades, handleClickLocalidad, fetchLocalidadResult } = useLocalidades( { parseUrl } )
	const [postalCode, setPostalCode] = useState<string[]>( [] )

	useEffect( () => {
		if ( fetchLocalidadResult ) {
			setLocalidades( ( prevState ) => [...prevState, fetchLocalidadResult.data[0].label] )
			if ( fetchLocalidadResult.data[0].postal_code ) {
				setPostalCode( ( prevState ) => [...prevState, fetchLocalidadResult.data[0].postal_code] )
			}
		}
	}, [fetchLocalidadResult] )

	return (
		<Layout title="Position Stack Api GeoCode">
			<div className='flex flex-col items-center justify-center h-screen'>
				<button className='px-2 py-1 mt-4 text-white bg-blue-600 rounded disabled:bg-gray-700 hover:bg-blue-800 disabled:cursor-not-allowed' type='button' onClick={handleClickLocalidad}>Obtener posicion actual</button>
				{localidades && localidades.map( ( localidad, i ) => {
					return (
						<React.Fragment key={`localidad-${i}`}>
							<p key={`localidad-${i}`}>Localidad {i + 1}: {localidad}</p>
							{postalCode.length > 0 && (
								<p>Postal Code: {postalCode}</p>
							)}
						</React.Fragment>
					)
				} )}
			</div>
		</Layout>
	)
}

export default PositioNStack