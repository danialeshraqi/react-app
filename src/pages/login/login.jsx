import { Controller, FormProvider, useForm } from "react-hook-form";
import "./login.scss";
import { useNavigate } from "react-router";
export const Login = () => {
  const methods = useForm({
    mode: "onSubmit",
  });
  const {
    control,
    watch,
    formState: { isSubmitted },
  } = methods;
  const username = watch("username");
  const password = watch("password");
  const navigate = useNavigate();
  const login = (data) => {
    if (!username || username.length < 4 || !password || password.length < 6)
      return;
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          localStorage.setItem("token", JSON.stringify(json.token));
          localStorage.setItem("user", JSON.stringify(data.username));
          navigate("/home");
        } else {
          alert("Username or password is wrong");
        }
      })
      .catch((error) => {
        alert("Username or password is wrong");
        console.log(error);
      });
  };
  return (
    <div className="login-page">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(login)}
          className="login-page__container"
        >
          <div className="login-page__container__title-container">
            {/* <span>img</span> */}
            <span className="login-page__container__title">WebSite</span>
          </div>
          <div className="login-page__container__field-input">
            <span className="login-page__container__field-input__label">
              UserName
            </span>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <input
                  {...field}
                  className="login-page__container__field-input__input"
                  type="text"
                />
              )}
            />
            {isSubmitted ? (
              <span className="login-page__container__field-input__caption">
                {username?.length < 4 ? (
                  " Please enter more than 4 lettres"
                ) : !username ? (
                  "Please enter username"
                ) : (
                  <></>
                )}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="login-page__container__field-input">
            <span className="login-page__container__field-input__label">
              Password
            </span>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <input
                  {...field}
                  className="login-page__container__field-input__input"
                  type="text"
                />
              )}
            />
            {isSubmitted ? (
              <span className="login-page__container__field-input__caption">
                {password?.length < 6 ? (
                  " Please enter more than 6 lettres"
                ) : !password ? (
                  "Please enter password"
                ) : (
                  <></>
                )}
              </span>
            ) : (
              <></>
            )}
          </div>
          <button type="submit">SING IN</button>
        </form>
      </FormProvider>
    </div>
  );
};
