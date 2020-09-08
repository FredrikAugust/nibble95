import React, {
    FC,
    useState,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import { User } from '../../types/User';
import { registerUser, handleLogin } from '../../artillery/authorization';

type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>
type HtmlEvent = React.ChangeEvent<HTMLInputElement>

type Props = {
  dispatchUser: (user?: User | null) => void
  rfid: string
  onEnter: (func: Function) => (event: KeyboardEvent) => void
}

const RegistrationView: FC<Props> = ({ dispatchUser, rfid, onEnter }: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [badLogin, setBadLogin] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => usernameRef.current!.focus(), []);

    const bindRfid = async () => {
        const response = await registerUser(username, password, rfid);
        if (response.ok) {
            const user = await handleLogin(rfid);
            dispatchUser(user);
        } else {
            setBadLogin(true);
        }
    };
    const setValue = (setState: Dispatch<SetStateAction<string>>) => (event: HtmlEvent) => (
        setState(event.target.value)
    );
    const goBack = () => dispatchUser(undefined);

    return (
        <>
            <div>
                <p>Register with your Online.ntnu.no username and password.</p>
                {badLogin ? <p>You logged in with wrong credentials. Try again</p> : null}
            </div>
            <div>
                <label htmlFor="username">Username: </label>
                <input
                    ref={usernameRef}
                    id="username"
                    type="text"
                    onKeyUp={onEnter(bindRfid)}
                    onChange={setValue(setUsername)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="password"
                    onKeyUp={onEnter(bindRfid)}
                    onChange={setValue(setPassword)}
                />
            </div>
            <div>
                <button type="button" onClick={bindRfid}>OK</button>
                <button type="button" onClick={goBack}>Back</button>
            </div>
        </>
    );
};

export default RegistrationView;
