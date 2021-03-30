import HolaMundo from "@components/HolaMundo"
import Layout from "@components/Layout"
import Google from "@components/Google"

const Index: React.FunctionComponent = () => {
	return (
		<Layout>
			<div className='flex flex-col items-center justify-center w-screen h-screen'>
				<HolaMundo />
				<Google />
			</div>
		</Layout>
	)
}

export default Index
