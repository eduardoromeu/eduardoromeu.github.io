import { Button, Pagination } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import GithubPagination from "../../../interfaces/GithubPagination";
import { useEffect, useState } from "react";

interface Props {
    current: number,
    last: number,
    prev: number,
    next: number,
    setPagination: Function
}

interface ItemProps {
    page: number,
    props?: {}
}

export default function PageSwitcher({current, last, prev, next, setPagination}: Props){ //Detectar quando o usuário mudou

    const [pageState, setPageState] = useState<GithubPagination>({current, last, next, prev});
    const [pageInputValue, setPageInputValue] = useState<string>("");
    const [showPageInput, setShowPageInput] = useState({});

    useEffect((() => {
        setPageState({current, last, next, prev});
    }), [current, last, prev, next]);

    function goToPage(page: number | string){
        const pageInt = (typeof(page) === 'string') ? Math.floor(Number(page)) : page;
        setPagination({...pageState, current: pageInt});
    }

    const PaginationItem = ({page, props}: ItemProps) => (
        <Pagination.Item onClick={() => goToPage(page)} {...props}>{page}</Pagination.Item>
    );

    const PageInput = (
        <Popover id="page-popover">
            <Popover.Header className="d-flex justify-content-start ps-2 text-center">
                <Button 
                    variant="outline-danger"
                    size="sm"
                    className="bi bi-x me-2 rounded-5 border-0"
                    //Make this work
                />
                Go to page {`(Max: ${last})`}
            </Popover.Header>
            <Popover.Body className="d-flex justify-content-between" as={InputGroup}>
                <Form.Control
                    id="page-input"
                    type="number"
                    min="1"
                    max={last}
                    placeholder={`1 ~ ${last}`}
                    onChange={event => setPageInputValue(event.target.value)}
                />
                <Button onClick={() => goToPage(pageInputValue)}> Go </Button>
            </Popover.Body>
        </Popover>
    );


    return (
        <Pagination className="d-flex justify-content-center">
            <Pagination.First onClick={() => goToPage(1)} disabled={last === 1} />
            <Pagination.Prev onClick={() => goToPage(prev)} hidden={last === 1} />
            {                
                [...Array((last < 5) ? last : 5)].map((e, i) => {
                    let index = i + 1;
                    if(current > 3){
                        index = index + (current - 3);
                        if(current > last - 2) index = index - 1;
                        if(current > last - 1) index = index - 1;
                    } 

                    return (
                        <PaginationItem key={index} page={index} props={{active: (index === current)}} />
                    )
                })
            }

            <OverlayTrigger
                overlay={PageInput}
                trigger="click"
                placement="bottom-start"
                {...showPageInput}
                onToggle={() => {
                    (last === 1) ? setShowPageInput({show: false}) : setShowPageInput({});
                }
            }>
                <Pagination.Ellipsis hidden={last <= 5} />
            </OverlayTrigger>

            <Pagination.Next onClick={() => goToPage(next)} hidden={last === 1} />
            <Pagination.Last onClick={() => goToPage(last)} disabled={last === 1} />
        </Pagination>
    );
}