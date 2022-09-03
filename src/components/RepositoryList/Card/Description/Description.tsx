import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";

interface Props {
    text?: string
}

export default function Description({ text }: Props) {

    const [description, setDescription] = useState<string>("Empty Description");

    useEffect(() => {
        if(text){
            setDescription(text); 
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid className="p-0 pb-1 overflow-auto d-flex" title="Description">
            <Form.Text className={`text-nowrap text-reset text-center ${(text) ? '' : 'fw-bold'} flex-fill`}>
                { description }
            </Form.Text>
        </Container>
    )
}