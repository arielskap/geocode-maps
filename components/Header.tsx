import Link from 'next/link'
const Header = () => {
	return (
		<header className='absolute top-0 left-0 z-50 w-full py-2 text-center border-b-2 border-blue-500'>
			<Link href="/">
				<a className="px-2 py-1 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800">Ir al home</a>
			</Link>
		</header>
	)
}

export default Header
