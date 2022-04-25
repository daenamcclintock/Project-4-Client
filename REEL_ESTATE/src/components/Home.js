import IndexProperties from "./properties/IndexProperties"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { user } = props

	return (
		<>
			<h2>Home Page</h2>
			<IndexProperties user={user} />
		</>
	)
}

export default Home
