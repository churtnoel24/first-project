import './App.css'
import Button from './components/Button';
import Card from './components/Card';

function App() {

  const cardItems = [{
    id: crypto.randomUUID(),
    title: 'Nabihag mo part 2',
    description: 'This is a movie called nabihag mo part 2'
  }, {
    id: crypto.randomUUID(),
    title: 'The Notebook',
    description: 'This is a movie called notebook'
  }, {
    id: crypto.randomUUID(),
    title: 'BSCS 3A',
    description: 'This is a movie called BSCS 3A'
  },];

  return (
    <div className='container mt-5'>
      {/* <Button color="primary" text="Confirm" />
        <Button color="secondary"text="Info" />
        <Button color="danger"text="Remove" /> */}
      <div className='d-flex flex-col gap-3'>
        {cardItems.map((item) => {
          return (
            <Card key={item.id} title={item.title} description={item.description} />
          )
        })}
      </div>
    </div>
  )
}

export default App
