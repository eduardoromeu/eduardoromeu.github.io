import { useState } from 'react';
import { InputGroup, Form, Button } from "react-bootstrap";
import GithubUser from "../../../interfaces/GithubUser";

interface Props {
    user: GithubUser
    setUser: Function
}

export default function User({user, setUser}: Props){

    const [newUser, setNewUser] = useState<string>("");

    const changeUser = (userLogin: string) => {
        if(userLogin) setNewUser(userLogin);
    }

    return (
        <InputGroup>
            <InputGroup.Text><i className="bi bi-person-fill" /></InputGroup.Text>
            <Form.Control placeholder="Github login" defaultValue={user.login} onChange={e => setNewUser(e.target.value)} />
            <Button variant="outline-secondary" onClick={() => changeUser(newUser)}><i className="bi bi-arrow-right" /></Button>
        </InputGroup>
    );
}