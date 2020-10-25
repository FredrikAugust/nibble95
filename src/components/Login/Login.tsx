import React, {
  FC,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
} from "react";
import { User } from "../../types/User";
import { handleLogin } from "../../artillery/authorization";
import { InputField } from ".";
import { Themes } from "../../state/globalState";

type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

type Props = {
  dispatchUser: (user?: User | null) => void;
  setRfid: Dispatch<SetStateAction<string>>;
  onEnter: (func: Function) => (event: KeyboardEvent) => void;
  theme: Themes;
};

const WAIT_INTERVAL = 2000;

const LoginView: FC<Props> = ({
  dispatchUser,
  setRfid,
  onEnter,
  theme,
}: Props) => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    window.addEventListener("keydown", focusInput);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("keydown", focusInput);
    };
  }, [inputRef, timer]);

  const login = async () => {
    if (!input) return;
    const user = await handleLogin(input);
    if (!user) setRfid(input);
    dispatchUser(user);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Reset timer if there's user interaction
    if (timer) {
      clearTimeout(timer);
    }
    setInput(event.target.value);
    setTimer(setTimeout(() => setInput(""), WAIT_INTERVAL));
  };

  return (
    <>
      <div>
        <p>Please scan your student card to log in or register to Nibble.</p>
      </div>
      <InputField theme={theme}>
        <label htmlFor="rfid">RFID: </label>
        <input
          id="rfid"
          type="text"
          ref={inputRef}
          value={input}
          onChange={onChange}
          onKeyUp={onEnter(login)}
        />
      </InputField>
      <div>
        <button onClick={login} type="button">
          OK
        </button>
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/images/themes/${theme}/rfid.png`}
          alt="RFID scan here"
        />
      </div>
    </>
  );
};

export default LoginView;
