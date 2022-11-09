import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  InputLabel,
  TextInput,
  PasswordInput,
  PrimaryButton,
} from "../components/Atoms";
import {
  Form,
  MainTitle,
  withReactMemo,
  Footer,
} from "../components/Molecules";
import { onGetImages, onSetUser } from "../store/actions/appStateActions";

// initial user inputs
const initialUserInputs = {
  username: "",
  password: "",
};

// with react memo HOC components
const WithMemoUserNameInput = withReactMemo(TextInput);
const WithMemoPasswordInput = withReactMemo(PasswordInput);
const WithMemoPrimaryButton = withReactMemo(PrimaryButton);

const Login = (props) => {
  const dispatch = useDispatch();
  const [userInputs, setUserInputs] = useState(initialUserInputs);

  useEffect(() => {
    if (sessionStorage.getItem("userName")) {
      props.history.push("/dashboard");
    }
  }, []);

  const onUserInputChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInputs((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("userName", userInputs.username);
    dispatch(onSetUser(userInputs.username));
    dispatch(onGetImages());
    props.history.push("/dashboard");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <MainTitle className={"text-center mt-5 mb-4"} />
            <Form onSubmit={onSubmit}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="my-2 d-flex flex-column justify-content-center align-items-center">
                  <InputLabel text={"username"} htmlFor={"username"} />
                  <WithMemoUserNameInput
                    placeholder={"Enter username here..."}
                    id={"username"}
                    name={"username"}
                    value={userInputs.username}
                    onChange={onUserInputChange}
                    required={true}
                  />
                </div>
                <div className="my-2 d-flex flex-column justify-content-center align-items-center">
                  <InputLabel text={"password"} htmlFor={"password"} />
                  <WithMemoPasswordInput
                    placeholder={"Enter password here..."}
                    id={"password"}
                    name={"password"}
                    value={userInputs.password}
                    onChange={onUserInputChange}
                    required={true}
                  />
                </div>
                <div className="mt-4">
                  <WithMemoPrimaryButton text={"Log in"} type={"submit"} />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
