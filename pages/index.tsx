import Link from 'next/link'
import HolaMundo from "@components/HolaMundo"
import Layout from "@components/Layout"

const Index: React.FunctionComponent = () => {
	return (
		<Layout title="Inicio 🌌">
			<div className='flex flex-col items-center justify-center w-screen h-screen'>
				<HolaMundo />
				<nav className='mt-4'>
					<ul className='space-y-6 text-center text-white'>
						<li>
							<Link href='/googleFull'>
								<a className='px-2 py-1 bg-blue-500 rounded hover:bg-blue-800'>Ir a Google Dos Peticiones</a>
							</Link>
						</li>
						<li>
							<Link href='/apiGeo'>
								<a className='px-2 py-1 bg-blue-500 rounded hover:bg-blue-800'>Ir a Api Geolocalizacion Nativa</a>
							</Link>
						</li>
						<li>
							<Link href='/bigDataCloud'>
								<a className='px-2 py-1 bg-blue-500 rounded hover:bg-blue-800'>Ir a Api Geolocalizacion Bid Data Cloud</a>
							</Link>
						</li>
						<li>
							<Link href='/positionStack'>
								<a className='px-2 py-1 bg-blue-500 rounded hover:bg-blue-800'>Ir a Api Geolocalizacion Position Stack</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</Layout>
	)
}

export default Index
