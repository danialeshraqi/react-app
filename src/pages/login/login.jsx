import { Controller, FormProvider, useForm } from "react-hook-form";
import "./login.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  username: yup.string().min(4).required("Enter more than 4 letters"),
  password: yup.string().min(6).required("Enter more than 6 letters"),
});

export const Login = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm({
    mode: "onSubmit",
    resolver: resolver,
  });
  const {
    control,
    watch,
    formState: { errors },
  } = methods;
  const username = watch("username");
  const password = watch("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = (data) => {
    if (!username || username.length < 4 || !password || password.length < 6)
      return;
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        if (response.data.token) {
          dispatch({ type: "TOKEN", data: response.data.token });
          dispatch({ type: "CHANGEUSER", data: data.username });
          dispatch({ type: "CHANGEPASSWORD", data: data.password });
          navigate("/home");
        } else {
          alert("Username or password is wrong");
        }
      })
      .catch(function (error) {
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
            <span className="login-page__container__title">WebSite</span>
          </div>
          <div className="login-page__container__field-input">
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  {...field}
                  className="login-page__container__field-input__input"
                  type="text"
                />
              )}
            />

            <span className="login-page__container__field-input__caption">
              {errors?.username?.message}
            </span>
          </div>
          <div className="login-page__container__field-input">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  {...field}
                  className="login-page__container__field-input__input"
                  type="text"
                />
              )}
            />
            <span className="login-page__container__field-input__caption">
              {errors?.password?.message}
            </span>
          </div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            type="submit"
          >
            {" "}
            SING IN
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
