import { Controller, FormProvider, useForm } from "react-hook-form";

import "./post.scss";

export const Post = () => {
  const methods = useForm({
    mode: "onSubmit",
  });
  const {
    control,
    watch,
    reset,
    formState: { isSubmitted },
  } = methods;
  const title = watch("title");
  const body = watch("body");

  const post = (data) => {
    if (!title || !body) return;
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(post)} className="postcontainer">
        <div className="post">
          <h1>Creat Post</h1>
          <div className="post__title">
            <span>Title</span>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <input {...field} className="post__title__input" />
              )}
            />
          </div>
          <div className="post__title">
            <span>Body</span>
            <Controller
              control={control}
              name="body"
              render={({ field }) => (
                <input {...field} className="post__title__input" />
              )}
            />
          </div>
          <div className="post__title">
            <span>Image</span>
            <input type="file" className="post__title__input" />
          </div>
          <button>Create</button>
        </div>
      </form>
    </FormProvider>
  );
};
