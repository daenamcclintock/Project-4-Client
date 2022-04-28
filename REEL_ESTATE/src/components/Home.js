import IndexProperties from "./properties/IndexProperties"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { user } = props

	return (
		<>
			<h1>Browse Some Properties</h1>
			<IndexProperties user={user} />
		</>
	)
}

export default Home