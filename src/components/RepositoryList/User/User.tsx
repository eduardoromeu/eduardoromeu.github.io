import { useState } from 'react';
import { InputGroup, Form, Button } from "react-bootstrap";
import * as ghApi from "../../../api/GithubAPI"
import GithubUser from "../../../interfaces/GithubUser";

interface Props {
    user: GithubUser
    setUser: Function
}

export default function User({user, setUser}: Props){ //Possiilitar visualizar informações do usuário

    const [newLogin, setNewLogin] = useState<string>((user.login) ? user.login : "");

    const changeUser = (userLogin: string) => {
        if(!userLogin || userLogin === user.login) return;
        ghApi.getUser(userLogin, (usr: GithubUser) => {
            if(!usr || usr === user) return;
            setUser(usr);
        });
    }

    return (
        <InputGroup title='Change User'>
            <InputGroup.Text><i className="bi bi-person-fill" /></InputGroup.Text>
            <Form.Control
                placeholder="Github login"
                defaultValue={user.login}
                onChange={event => setNewLogin(event.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter') changeUser(newLogin);
                }}
            />
            <Button 
                variant="outline-secondary"
                onClick={() => changeUser(newLogin)}
            >
                <i className="bi bi-arrow-right" />
            </Button>
        </InputGroup>
    );
}