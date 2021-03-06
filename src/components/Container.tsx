import styled from 'styled-components';

type DivProps = {
    bgcolor?: string;
    mright?: string;
    mleft?: string;
    mtop?: string;
    children?: any;
    padding?: string;
    bshadow?: string;
    overflow?: boolean;
};

const StyledDiv = styled.div`
    margin-right: ${(p: DivProps) => (p.mright ? p.mright : '7%')};
    margin-left: ${(p: DivProps) => (p.mleft ? p.mleft : '7%')};

    ${(p: DivProps) => (p.bgcolor ? 'background-color: ' + p.bgcolor : '')};
    ${(p: DivProps) => (p.padding ? 'padding: ' + p.padding : '')};
    ${(p: DivProps) => (p.mtop ? 'margin-top: ' + p.mtop : '')};
    ${(p: DivProps) => (p.overflow ? 'overflow: auto' : '')};

    border-radius: 8px;

    box-shadow: ${(p: DivProps) => (p.bshadow ? p.bshadow : 'none')};
`;

export default function Container(props: DivProps) {
    return (
        <StyledDiv
            bshadow={props.bshadow}
            mtop={props.mtop}
            mleft={props.mleft}
            mright={props.mright}
            bgcolor={props.bgcolor}
            padding={props.padding}
            overflow={props.overflow}
        >
            {props.children}
        </StyledDiv>
    );
}
