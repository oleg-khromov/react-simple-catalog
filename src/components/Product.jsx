import React, { useState } from "react";

import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

import FORMS, { ROUTES_PATH } from "../constants";
import { actions } from "../store/actions";
import { getProductById } from "../store/selectors";

// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";

import {
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  TextField,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Product = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const currentProduct = useSelector(getProductById(Number(id)));

  const handleSubmit = (data) => {
    if (currentProduct) {
      dispatch(actions.PRODUCT_EDIT.REQUESTED({ id, ...data }));
    } else {
      dispatch(actions.PRODUCT_ADD.REQUESTED(data));
    }
  };

  return (
    <Container>
      <div className="box">
        <Grid container className="center">
          <Grid item xs>
            <Typography component="h1" variant="h5">
              {!id ? "Add Product" : "Edit Product"}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(push(ROUTES_PATH.CATALOG))}
            >
              BACK
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider className="hr"></Divider>
      <div className="box">
        <Grid container>
          <Grid item>
            <Formik
              enableReinitialize={true}
              initialValues={
                currentProduct ? { ...currentProduct } : FORMS.PRODUCT.INIT
              }
              validationSchema={FORMS.PRODUCT.SCHEME}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                handleChange,
                setFieldValue,
                setFieldTouched,
                values: {
                  id,
                  title,
                  description,
                  image,
                  price,
                  discount,
                  discount_time,
                },
              }) => {
                const fileReaderToBase64 = (file) =>
                  new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.onload = (e) => {
                      let image = new Image();
                      image.src = e.target.result;

                      image.onload = function () {
                        let height = this.height;
                        let width = this.width;
                        //console.log(height, width);
                        if (
                          height > 4000 ||
                          width > 4000 ||
                          height < 200 ||
                          width < 200
                        ) {
                          image.src = "";
                          reject(
                            new Error(
                              "Height and Width must not exceed 4000px and must be not lower 200px."
                            )
                          );
                        } else {
                          resolve(reader.result);
                        }
                      };
                    };
                    reader.onerror = (error) => reject(error);
                  }).catch((error) => {
                    alert(error);
                  });
                return (
                  <Form>
                    <div>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          {image ? (
                            <img className="p-photo" src={image} alt="" />
                          ) : null}
                          <FormControl fullWidth margin="dense">
                            <OutlinedInput
                              fullWidth
                              error={touched.image && Boolean(errors.image)}
                              onChange={async (e) => {
                                e.persist();
                                const [image] = e.target.files;

                                if (image) {
                                  const base64ImageUrl = await fileReaderToBase64(
                                    image
                                  );
                                  setFieldValue(
                                    "image",
                                    base64ImageUrl ? base64ImageUrl : ""
                                  );
                                  setFieldTouched(e.target.name, true, false);
                                }
                              }}
                              id="image"
                              name="image"
                              inputProps={{ name: "image" }}
                              type="file"
                            />
                            <FormHelperText error={Boolean(errors.image)}>
                              {touched.image && errors.image}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="title"
                            name="title"
                            label="Title"
                            value={title}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            helperText={touched.name && errors.name}
                            error={touched.title && Boolean(errors.title)}
                            onChange={(e) => {
                              setFieldValue("title", e.target.value);
                              setFieldTouched("title", true, false);
                            }}
                          />
                          <FormHelperText error={Boolean(errors.title)}>
                            {touched.title && errors.title}
                          </FormHelperText>
                          <FormControl className="textarea-wrap">
                            <CKEditor
                              name="description"
                              id="description"
                              editor={ClassicEditor}
                              data={description || ""}
                              onChange={(e, editor) => {
                                const data = editor.getData();
                                setFieldValue("description", data);
                                setFieldTouched("description", true, false);
                              }}
                            />
                          </FormControl>
                          <FormHelperText error={Boolean(errors.description)}>
                            {touched.description && errors.description}
                          </FormHelperText>
                          <TextField
                            id="price"
                            name="price"
                            label="Price"
                            value={price}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            helperText={touched.name && errors.name}
                            error={touched.price && Boolean(errors.price)}
                            onChange={(e) => {
                              setFieldValue("price", e.target.value);
                              setFieldTouched("price", true, false);
                            }}
                          />
                          <FormHelperText error={Boolean(errors.price)}>
                            {touched.price && errors.price}
                          </FormHelperText>
                          <TextField
                            id="discount"
                            name="discount"
                            label="Discount"
                            value={discount}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            helperText={touched.name && errors.name}
                            error={touched.discount && Boolean(errors.discount)}
                            onChange={(e) => {
                              setFieldValue("discount", e.target.value);
                              setFieldTouched("discount", true, false);
                            }}
                          />
                          <FormHelperText error={Boolean(errors.discount)}>
                            {touched.discount && errors.discount}
                          </FormHelperText>
                          <TextField
                            id="discount_time"
                            name="discount_time"
                            label="Discount time"
                            value={discount_time}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            type="date"
                            helperText={touched.name && errors.name}
                            error={
                              touched.discount_time &&
                              Boolean(errors.discount_time)
                            }
                            onChange={(e) => {
                              setFieldValue("discount_time", e.target.value);
                              setFieldTouched("discount_time", true, false);
                            }}
                          />
                          <FormHelperText error={Boolean(errors.discount_time)}>
                            {touched.discount_time && errors.discount_time}
                          </FormHelperText>
                        </Grid>
                        <Grid item xs={12} className="btnwrap">
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Product;
