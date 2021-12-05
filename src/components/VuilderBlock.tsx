import styled from 'styled-components';

const StyledBlock = styled.div`
    background-color: red;
    text-align: center;
`;

export default function VuilderBlock() {
    return (
        <StyledBlock>
            <p>@elonmusk</p>
            <img src="https://via.placeholder.com/150" alt="" />
            <p>
                <button>Learn more</button>
            </p>
        </StyledBlock>
    );
}
