import React, { useRef, useState, useEffect} from "react";
import { Card } from "react-bootstrap";

export default function CollapsableCard(props) {
    
    const [cardOpen, setCardOpen] = useState(props.expanded);
    const [show, setShow] = useState((props.expanded) ? "show" : "");
    const [border, setBorder] = useState(props.border);
    const chevronIcon = useRef({true : "bi-chevron-up", false : "bi-chevron-down"});
    
    useEffect(() => {
        (props.border === undefined) ? setBorder("") : setBorder(props.border);
    }, [props]);
    
    return (
        <Card className={`border-${border} m-2`}>
            <Card.Header className="d-flex justify-content-between align-items-center" onClick={() => setCardOpen(!cardOpen)} style={{cursor:"pointer"}} data-bs-toggle="collapse" data-bs-target={`#${props.id}CardBody`} aria-expanded={cardOpen} aria-controls={`#${props.id}CardBody`}> 
                <Card.Title className="m-0">{props.title}</Card.Title>
                <i className={`bi ${chevronIcon.current[cardOpen]}`}></i>
            </Card.Header>
            <Card.Body className={`collapse ${show} px-2 py-0`} id={`${props.id}CardBody`}>
                {props.children}
            </Card.Body>
        </Card>
    );
}