import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <h1>Hello from the Home Page</h1>
        </>
    );
}



export default Home;