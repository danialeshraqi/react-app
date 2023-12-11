import axios from "axios";
import "./EditUser.scss";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { useParams } from "react-router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useYupValidationResolver } from "../login";
import * as yup from "yup";

export const EditUser = (props) => {
  const validationSchema = yup.object({
    name: yup.string().required("Please enter name"),
    username: yup.string().required("Please enter username"),
    phone: yup.string().required("Please enter phone"),
    email: yup.string().email().required("please enter email address"),
  });
  const params = useParams();

  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);

  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm({
    mode: "onSubmit",
    resolver: resolver,
  });
  const {
    setValue,
    formState: { errors },
  } = methods;

  const post = (data) => {
    setOpen(true);
    axios.put(`https://jsonplaceholder.typicode.com/users/${params.id}`, {
      name: data.name,
      username: data.username,
      phone: data.phone,
      email: data.email,
    });
  };
  const getuser = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then((res) => {
        setValue("name", res.data.name);
        setValue("username", res.data.username, { shouldDirty: true });
        setValue("phone", res.data.phone);
        setValue("email", res.data.email);
        setUser(res.data);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    getuser();
  }, []);

  if (!user) return <></>;
  else
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(post)} className="edit">
          <div className="editcontainer">
            <h1 className="edituser">EditUser</h1>
            <div className="editcontainer__name">
              <Controller
                control={methods.control}
                name="name"
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    color="primary"
                    fullWidth={true}
                    {...field}
                    className="editcontainer__name__input"
                  />
                )}
              />
              <span className="post__error">{errors?.name?.message}</span>
            </div>
            <div className="editcontainer__name">
              <Controller
                control={methods.control}
                name="username"
                render={({ field }) => (
                  <TextField
                    id="outlined-basic4"
                    label="Username"
                    variant="outlined"
                    color="primary"
                    fullWidth={true}
                    {...field}
                    className="editcontainer__name__input"
                  />
                )}
              />
              <span className="post__error">{errors?.username?.message}</span>
            </div>
            <div className="editcontainer__name">
              <Controller
                control={methods.control}
                name="phone"
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="Mobile Number"
                    variant="outlined"
                    color="primary"
                    fullWidth={true}
                    {...field}
                    className="editcontainer__name__input"
                  />
                )}
              />
              <span className="post__error">{errors?.phone?.message}</span>
            </div>
            <div className="editcontainer__name">
              <Controller
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    color="primary"
                    fullWidth={true}
                    {...field}
                    className="editcontainer__name__input"
                  />
                )}
              />
              <span className="post__error">{errors?.email?.message}</span>
            </div>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              fullWidth={true}
            >
              Edit
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h5 id="child-modal-title">User edited successfully</h5>
              </Box>
            </Modal>
          </div>
        </form>
      </FormProvider>
    );
};
