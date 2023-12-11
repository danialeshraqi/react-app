import { Controller, FormProvider, useForm } from "react-hook-form";

import "./post.scss";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { addPost } from "../Api/addPost";
import { useYupValidationResolver } from "../login/login";
import * as yup from "yup";

export const Post = () => {
  const validationSchema = yup.object({
    title: yup.string().required("Please enter the title"),
    body: yup.string().required("Please enter the body"),
  });
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm({
    mode: "onSubmit",
    resolver: resolver,
  });
  const {
    control,
    watch,
    reset,
    formState: { isSubmitted, errors },
  } = methods;
  const title = watch("title");
  const body = watch("body");
  const [open, setOpen] = useState(false);

  const post = (data) => {
    if (!title || !body) return;
    addPost({ title: title, body: body });

    reset();
    setOpen(true);
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
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(post)} className="postcontainer">
        <div className="post">
          <h1 className="creatpost">Creat Post</h1>
          <div className="post__title">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  {...field}
                  className="post__title__input"
                />
              )}
            />
            <span className="post__error">{errors?.title?.message}</span>
          </div>
          <div className="post__title">
            <Controller
              control={control}
              name="body"
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Body"
                  variant="outlined"
                  color="primary"
                  fullWidth={true}
                  {...field}
                  className="post__title__input"
                />
              )}
            />
            <span className="post__error">{errors?.body?.message}</span>
          </div>
          <div className="post__title">
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="primary"
              fullWidth={true}
              type="file"
              className="post__title__input"
            />
          </div>
          <Button
            size="large"
            variant="contained"
            color="primary"
            type="submit"
            fullWidth={true}
          >
            {" "}
            Creat Post
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 200 }}>
              <h5 id="child-modal-title">Post create successfully</h5>
            </Box>
          </Modal>
        </div>
      </form>
    </FormProvider>
  );
};
