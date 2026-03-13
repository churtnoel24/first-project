import { Link } from 'react-router-dom'

function About({ cardItems }) {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <h1>Hello from the About Page</h1>

            {cardItems.map((item) => {
                return <div className="card" style={{ width: '18rem' }} key={item.id}>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <Link className='btn btn-primary' to={`/about/${item.id}`}>See More</Link>
                    </div>
                </div>
            })}
        </>
    );
}



export default About;