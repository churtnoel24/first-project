import { Link } from 'react-router-dom'
import { useState } from 'react';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import FormInput from '../components/FormInput'
import { formatDate } from '../utils/formatDate'

function Home() {

    const [modal, SetModal] = useState(false);
    const [password, SetPassword] = useState('');

    const loggedDate = "4/10/2026";
    return (
        <>
            <Navbar user="Churt" />
            {formatDate(loggedDate)}
            <Button label="Open Modal" variant="primary" onClick={() => { SetModal(true) }} />
            <Modal isOpen={modal} title="Test Modal" onClose={() => SetModal(false)}
                onConfirm={() => SetModal(false)}>
                <FormInput label="Password" type="password" name="password" value={password} onChange={(e)=>SetPassword(e.target.value)} 
                    placeholder="Password"/>
            </Modal>
        </>
    );
}



export default Home;