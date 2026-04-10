import { Link, useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("username");
        navigate('/login');
    }


    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            <h1>Hello from the Home Page</h1>
            <button onClick={logout} className='btn btn-danger'>LOGOUT</button>
        </>
    );
}



export default Home;