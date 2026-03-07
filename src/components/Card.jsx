import Button from "./Button";

function Card({ title, description }) {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
            </div>
            <Button text="See More" color="primary" />
        </div>
    );
}

export default Card;