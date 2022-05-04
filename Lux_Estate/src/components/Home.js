import IndexProperties from "./properties/IndexProperties"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { user } = props

	return (
		<>
			<IndexProperties user={user} />
		</>
	)
}

export default Home