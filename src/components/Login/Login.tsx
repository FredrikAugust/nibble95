import React, {
    FC,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
    useState,
    ChangeEvent,
} from 'react';
import { User } from '../../types/User';
import { handleLogin } from '../../artillery/authorization';

type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>

type Props = {
  dispatchUser: (user?: User | null) => void;
  setRfid: Dispatch<SetStateAction<string>>;
  onEnter: (func: Function) => (event: KeyboardEvent) => void
}

const LoginView: FC<Props> = ({ dispatchUser, setRfid, onEnter }: Props) => {
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => inputRef.current!.focus(), []);

    const login = async () => {
        if (!input) return null;
        const user = await handleLogin(input);
        if (!user) setRfid(input);
        setInput('');
        dispatchUser(user);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    return (
        <>
            <div>
                <p>Please scan your student card to log in or register to Nibble.</p>
            </div>
            <div>
                <label htmlFor="rfid">RFID: </label>
                <input
                    id="rfid"
                    type="text"
                    ref={inputRef}
                    value={input}
                    onChange={onChange}
                    onKeyUp={onEnter(login)}
                />
            </div>
            <div>
                <button onClick={login} type="button">OK</button>
            </div>
            <div>
                <img
                    src={`${process.env.PUBLIC_URL}/rfid.png`}
                    alt="RFID scan here"
                />
            </div>
        </>
    );
};

export default LoginView;
