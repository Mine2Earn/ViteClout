import axios from 'axios';
import { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ConnectButton from '../components/ConnectButton';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import ProfileDescription from '../components/ProfileDescription';
import ProfilePicture from '../components/ProfilePicture';
import Title from '../components/Title';
import TokenBalance from '../components/TokenBalance';
import { UserContext } from '../context/UserContext';
import { APIHOST } from '../config';
import Table from '../components/Table';
import { useModal } from '../hooks/useModal';
import toaster, { toast } from 'react-hot-toast';

const FlexCtn = styled.div`
    display: flex;
    justify-content: center;
`;

const LW = styled.div`
    width: 50%;
`;

const RW = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    padding: 1em;
    background-color: #00a7ff;
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
        cursor: pointer;
    }
`;

const CloseButton = styled.button`
    padding: 1em;
    margin-right: 2.5em;
    background-color: #dc3545;
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    white-space: nowrap;
    align-self: flex-end;

    &:hover {
        cursor: pointer;
    }
`;

const StyledInput = styled.input`
    padding: 1em;
    background-color: #00a7ff;
    border: none;
    box-shadow: none;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
        cursor: pointer;
    }
`;

const Modal = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBox = styled.div`
    background-color: #04111d;
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border: 1px solid white;
    padding: 2rem 0;
`;

const Clear = styled.div`
    padding: 20px;
`;

const Text = styled.textarea`
    width: 400px;
    height: 200px;
    border: none;
    padding: 1rem;
    border-radius: 6px;
    resize: none;
`;

export default function Account() {
    let userInfo = useContext(UserContext);
    const address = 'vite_8dbacfdd1d1b178632b8aa5c2bd73d9f49e514ff56a81cedfc';

    let header = ['Token id', 'Type', 'Price'];
    let [body, setBody] = useState<Array<Array<string>>>([]);
    const [file, setFile] = useState(null);
    const [isShowing, toggle]: any = useModal(false);
    const descr = useRef(null);

    console.log(userInfo);

    let getTransactionByHolder = address => {
        axios
            .get(`${APIHOST}/transactions/all?holder=${address}`)
            .then(res => {
                if (res.data.result) {
                    const results = res.data.result;

                    const __body = results.map(result => {
                        return ['@' + result.twitter_tag, result.type ? 'BUY' : 'SELL', `${result.amount}@${result.price / Math.pow(10, 18)} $VITE`];
                    });

                    setBody(__body);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        getTransactionByHolder(address);
    }, []);

    const onChangeImage = e => {
        setFile(e.target.files[0]);
    };

    const uploadImage = e => {
        e.preventDefault();
        if (file) {
            let body = new FormData();
            // @ts-ignore
            body.append('avatar', file);
            const headers = {
                'Content-Type': 'multipart/form-data'
            };
            axios
                .post(`${APIHOST}/users/upload`, body, {
                    withCredentials: true,
                    headers
                })
                .then(res => {
                    console.log(res);
                    toast.success('Image uploaded successfully');
                })
                .catch(err => {
                    console.error(err.response);
                    toast.error('Image upload failed');
                });
        } else {
            toast.error('No image provided');
        }
    };

    const onChangeDescr = () => {
        axios
            .post(
                `${APIHOST}/users/bio`,
                {
                    // @ts-ignore
                    bio: descr.current.value
                },
                {
                    withCredentials: true
                }
            )
            .then(res => {
                console.log(res);
                toast.success('Description changed successfully');
            })
            .catch(err => {
                console.error(err.response);
                toast.error('Description change failed');
            });
    };

    if (userInfo.isLoggedIn && userInfo.user) {
        return (
            <>
                {isShowing && (
                    <Modal>
                        <ModalBox>
                            <CloseButton onClick={toggle}>Close</CloseButton>
                            <h1>Enter the new description :</h1>
                            <Text ref={descr} />
                            <Clear />
                            <StyledButton onClick={onChangeDescr}>Update</StyledButton>
                        </ModalBox>
                    </Modal>
                )}
                <Navbar></Navbar>
                <Title size={2}>
                    {userInfo.user.displayName} @{userInfo.user.twitter_tag}
                </Title>
                <FlexCtn>
                    <LW>
                        <Container bgcolor={'#292F34'}>
                            <p>Type: Vuilder</p>
                            <ProfilePicture twttag={`@${userInfo.user.twitter_tag}`}></ProfilePicture>
                            <ProfileDescription twttag={`@${userInfo.user.twitter_tag}`}></ProfileDescription>
                            <form onSubmit={uploadImage}>
                                <input type="file" onChange={onChangeImage} />
                                <StyledInput type="submit" value="Upload Photo" />
                            </form>
                            <StyledButton onClick={toggle}>Update Description</StyledButton>
                        </Container>
                    </LW>
                    <div>
                        <Container bgcolor={'#292F34'}>
                            <TokenBalance address={address}></TokenBalance>
                            <Table head={header} body={body}></Table>
                        </Container>
                    </div>
                </FlexCtn>
            </>
        );
    } else {
        // TODO: Show account of user connected with ViteConnect
        return (
            <>
                <ConnectButton></ConnectButton>
            </>
        );
    }
}
