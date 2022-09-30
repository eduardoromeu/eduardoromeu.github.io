import { Button, Pagination } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import GithubPagination from "../../../interfaces/GithubPagination";
import { useEffect, useState } from "react";

interface Props {
    pagination: GithubPagination,
    setPagination: Function
}

interface ItemProps {
    page: number,
    props?: {}
}

export default function PageSwitcher({pagination, setPagination}: Props){ //Detectar quando o usuário mudou

    const {current, last, next, prev} = pagination;
    const [pagesToRender, setPagesToRender] = useState<number[]>([]);
    const [pageInputValue, setPageInputValue] = useState<string>("");
    const [showPageInput, setShowPageInput] = useState({});

    useEffect(() => {
        let pages: number[] = [];

        if(last <= 5 || current <= 3){
            for(let i = 1; i <= last; i++){
                pages.push(i);
            }
        } else {
            if(next + 1 === last){
                [next, next + 1].map(e => pages.push(e))
            }
            [prev - 1, prev].map(e => pages.push(e));
        }
        setPagesToRender(pages);
    }, [pagination]);
    
    function goToPage(page: number | string){
        const pageInt = (typeof(page) === 'string') ? Math.floor(Number(page)) : page;
        setPagination({...pagination, current: pageInt});
    }

    const PaginationItem = ({page, props}: ItemProps) => (
        <Pagination.Item onClick={() => goToPage(page)} {...props}>{page}</Pagination.Item>
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
                        <PaginationItem page={index} props={{active: (index === current)}} />
                    )
                })
            }

            <Pagination.Next onClick={() => goToPage(next)} hidden={last === 1} />
            <Pagination.Last onClick={() => goToPage(last)} disabled={last === 1} />
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
        </Pagination>
    );
}