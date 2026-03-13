import { Link, useParams } from 'react-router-dom'

function AboutDetails({ cardItems }) {

    const { id } = useParams();

    const cardItem = cardItems.find((c) => c.id === Number(id));
    return (
        <>
            Item ID: {id}<br></br>
            Item Title: {cardItem.title}<br></br>
            Item Description: {cardItem.description}
        </>
    );
}



export default AboutDetails;