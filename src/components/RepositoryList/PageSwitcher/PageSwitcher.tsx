import { Button, Pagination } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import GithubPagination from "../../../interfaces/GithubPagination";
import { useState } from "react";

interface Props {
    pagination: GithubPagination,
    setPagination: Function
}

interface ItemProps {
    page: number
}

export default function PageSwitcher({pagination, setPagination}: Props){

    const {current, last, next, prev} = pagination;
    const [pageValue, setPageValue] = useState<string>("");
    const [showPageInput, setShowPageInput] = useState({})
    
    function goToPage(page: number | string){
        const pageInt = (typeof(page) === 'string') ? Math.floor(Number(page)) : page;
        setPagination({...pagination, current: pageInt});
    }

    const PaginationItem = ({page}: ItemProps) => (
        <Pagination.Item onClick={() => setPagination({...pagination, current: page})}>{page}</Pagination.Item>
    );

    const PageInput = (
        <Popover id="page-popover">
            <Popover.Header>Go to page {`(Max: ${last})`}</Popover.Header>
            <Popover.Body className="d-flex justify-content-between" as={InputGroup}>
                <Form.Control
                    id="page-input"
                    type="number"
                    min="1"
                    max={last}
                    placeholder={`1 ~ ${last}`}
                    onChange={event => setPageValue(event.target.value)}
                />
                <Button onClick={() => goToPage(pageValue)}> Go </Button>
            </Popover.Body>
        </Popover>
    );

    return (
        <Pagination className="d-flex justify-content-center">
            <Pagination.First onClick={() => setPagination({...pagination, current: 1})} disabled={last === 1} />
            <Pagination.Prev onClick={() => setPagination({...pagination, current: prev})} hidden={last === 1} />
            {
                <>
                    { (prev - 1 <= 0)  ? <></> : <PaginationItem page={prev - 1} /> }
                    { (prev === current) ? <></> : <PaginationItem page={prev} /> }
                    <OverlayTrigger 
                        overlay={PageInput}
                        trigger="click"
                        placement="bottom-start"
                        {...showPageInput}
                        onToggle={() => {
                            (last === 1) ? setShowPageInput({show: false}) : setShowPageInput({});
                        }
                    }>
                        <Pagination.Item active style={{cursor: "pointer"}}>{current}</Pagination.Item>
                    </OverlayTrigger>
                    { (next === current) ? <></> : <PaginationItem page={next} /> }
                    { (next + 1 > last) ? <></> : <PaginationItem page={next + 1} /> }
                </>
            }
            <Pagination.Next onClick={() => setPagination({...pagination, current: next})} hidden={last === 1} />
            <Pagination.Last onClick={() => setPagination({...pagination, current: last})} disabled={last === 1} />
        </Pagination>
    );
}