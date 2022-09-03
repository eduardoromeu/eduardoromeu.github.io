import { Pagination } from "react-bootstrap";
import GithubPagination from "../../../interfaces/GithubPagination";

interface Props {
    pagination: GithubPagination,
    setPagination: Function
}

export default function PageSwitcher({pagination, setPagination}: Props){ //Consertar paginador acima do limite

    const {current, last, next, prev} = pagination;


    return (
        <Pagination className="d-flex justify-content-center">
            <Pagination.First onClick={() => setPagination({...pagination, current: 1})} />
            <Pagination.Prev onClick={() => setPagination({...pagination, current: prev})} />
            {
                (last <= 5 || current < 4) ? [...Array(5)].map((e, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === current}
                        onClick={() => setPagination({...pagination, current: index + 1})}
                    >
                        {index + 1}
                    </Pagination.Item>
                )) :
                <>
                    <Pagination.Item onClick={() => setPagination({...pagination, current: prev - 1})}>{prev - 1}</Pagination.Item>
                    <Pagination.Item onClick={() => setPagination({...pagination, current: prev})}>{prev}</Pagination.Item>
                    <Pagination.Item active>{current}</Pagination.Item>
                    <Pagination.Item onClick={() => setPagination({...pagination, current: next})}>{next}</Pagination.Item>
                    <Pagination.Item onClick={() => setPagination({...pagination, current: next + 1})}>{next + 1}</Pagination.Item>
                </>
            }
            <Pagination.Next onClick={() => setPagination({...pagination, current: next})} />
            <Pagination.Last onClick={() => setPagination({...pagination, current: last})} />
        </Pagination>
    );
}