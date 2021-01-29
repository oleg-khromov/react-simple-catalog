import React, { useEffect } from "react";

import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { ROUTES_PATH } from "../constants";
import { actions } from "../store/actions";
import { getProducts } from "../store/selectors";

import {
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";

const Catalog = () => {
  const dispatch = useDispatch();
  let { products, loading } = useSelector(getProducts());

  useEffect(() => {
    dispatch(actions.PRODUCTS_FETCH.REQUESTED());
  }, []);

  return (
    <Container>
      <div className="box">
        <Grid container className="center">
          <Grid item xs>
            <Typography component="h1" variant="h5">
              Catalog
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(push(ROUTES_PATH.PRODUCT))}
            >
              ADD PRODUCT
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider className="hr"></Divider>
      {!loading ? (
        <div className="box">
          <Grid container spacing={3}>
            {Array.from(products).map((product, index) => {
              const {
                id,
                title,
                image,
                description,
                discount,
                price,
                discount_time,
              } = product;

              let productDay = moment(discount_time);
              let deadline = Math.floor(moment().diff(productDay, "day", true));
              let discountFlag = discount && deadline ? true : false;
              let discountPrice;

              if (discountFlag) {
                discountPrice = price - (price * discount) / 100;
              }

              return (
                <Grid item xs={6} key={index}>
                  <Card className="productcard">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={title}
                        height="140"
                        image={image}
                        title={title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {title}
                        </Typography>
                        <div className="group">
                          <Typography
                            variant="h5"
                            component="h2"
                            className="price"
                          >
                            {discountFlag && (
                              <span className="oldprice" color="textSecondary">
                                {price}
                              </span>
                            )}
                            {discountFlag ? discountPrice : price}
                          </Typography>
                          {discountFlag ? (
                            <Typography color="secondary">
                              {Math.abs(deadline)} days
                            </Typography>
                          ) : null}
                        </div>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          dangerouslySetInnerHTML={{
                            __html: description || null,
                          }}
                        ></Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          dispatch(push(`${ROUTES_PATH.PRODUCT}/${index}`))
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() =>
                          dispatch(actions.PRODUCT_REMOVE.REQUESTED(id))
                        }
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ) : (
        <div className="loader">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Catalog;
