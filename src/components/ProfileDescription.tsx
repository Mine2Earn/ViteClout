import styled from 'styled-components';

const Desc = styled.div`
    margin: 10px 20px;
`;

export default function ProfilePicture(props: { twttag: string; size?: string }) {
    return (
        <Desc>
            <cite>
                Dans l'idée ici ce serait la description que l'user a rentré. Ou s'il n'en n'a pas rentré sa bio twitter Dans l'idée ici ce serait la description que
                l'user a rentré. Ou s'il n'en n'a pas rentré sa bio twitter
            </cite>
        </Desc>
    );
}
