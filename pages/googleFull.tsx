import Layout from "@components/Layout"
import Google from "@components/Google"

const GoogleFull: React.FC = () => {
	return (
		<Layout>
			<div className='flex flex-col items-center justify-center h-screen'>
				<Google />
			</div>
		</Layout>
	)
}

export default GoogleFull
