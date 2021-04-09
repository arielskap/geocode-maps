import { useEffect, useState } from "react"


const useGeolocation = () => {
	const [geolocation, setGeolocation] = useState( false )

	useEffect( () => {
		navigator.permissions.query( {name: `geolocation`} ).then( ( result ) => {
			report( result.state )
			if ( result.state == `granted` ) {
				setGeolocation( true )
			} else if ( result.state == `prompt` ) {
				setGeolocation( true )
			} else if ( result.state == `denied` ) {
				setGeolocation( false )
			}
			result.onchange = function() {
				report( result.state )
				if ( result.state == `granted` ) {
					setGeolocation( true )
				} else if ( result.state == `denied` ) {
					setGeolocation( false )
				}
			}
		} )
		function report( state: string ) {
			console.log( `Permission ` + state )
		}
	}, [] )

	return [geolocation]
}

export default useGeolocation