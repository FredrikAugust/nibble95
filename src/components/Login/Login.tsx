import React, {
    FC,
    useRef,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import { User } from '../../types/User';
import { handleLogin } from '../../artillery/authorization';

type Props = {
  dispatchUser: (user?: User | null) => void;
  setRfid: Dispatch<SetStateAction<string>>;
}

const LoginView: FC<Props> = ({ dispatchUser, setRfid }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { inputRef.current!.focus(); });

    return (
        <>
            <div>
                <img
                    src={`${process.env.PUBLIC_URL}/find.png`}
                    alt="Search icon win95"
                />
            </div>
            <div>
                <p>Please scan your student card to log in or register to Nibble.</p>
            </div>
            <div>
                <label htmlFor="rfid">RFID: </label>
                <input
                    id="rfid"
                    type="text"
                    ref={inputRef}
                    onKeyUp={async (e) => {
                        e.persist();
                        if (e.keyCode === 13) {
                            handleLogin(e.currentTarget.value, dispatchUser, setRfid);
                            (e.target as EventTarget & HTMLInputElement).value = '';
                        }
                    }}
                />
            </div>
            <div>
                <button type="button">OK</button>
            </div>
        </>
    );
};

export default LoginView;
