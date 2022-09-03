import { Badge, Container } from "react-bootstrap";

interface Props {
    topics?: string[]
}

export default function Topics({topics}: Props){
    return (
        <Container fluid className="p-0 pb-1 d-flex overflow-auto" title="Topics">
            { (!topics || !topics.length) ? ( <Badge pill bg="light" text="dark" className="flex-fill">No Topics</Badge> ) :
                (
                    topics.map((topic) => (
                        <Badge 
                            as="a" 
                            key={topic} 
                            pill 
                            bg="light" 
                            text="dark" 
                            className="mx-1 text-decoration-none"  
                            href={`https://github.com/topics/${topic}`}
                        >
                            {topic}
                        </Badge>
                    ))
                )
            }
        </Container>
    )
}