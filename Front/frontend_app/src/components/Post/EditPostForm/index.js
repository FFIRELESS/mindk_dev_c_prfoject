import React from "react";
import * as Yup from 'yup';
import {Formik, Form, Field} from "formik";
import {TextField} from "formik-mui";
import {useMutation} from "react-query";

import {Box, Button, createTheme, Grid, MenuItem} from "@mui/material";
import {editPost} from "../../../containers/Post/api/crud";
import {ThemeProvider} from "@emotion/react";

const EditPostForm = ({id, postData}) => {
    const  { mutate, isLoading } = useMutation(({id, data}) => editPost(id, data));

    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            neutral: {
                main: '#000000'
            },
        },
    });

    const visibilityVars = [
        {
            value: 'none',
            label: 'None'
        },
        {
            value: 'friends',
            label: 'Friends'
        },
        {
            value: 'all',
            label: 'All'
        }
    ]

    const schema = Yup.object().shape({
        User_ID: Yup.number().typeError('User must be a number').required(),
        Title: Yup.string('Title must not be empty').required(),
        Text: Yup.string('Text must not be empty').required(),
        Visibility: Yup.string().required()
    });

    const onFormSubmit = (data, actions) => {
        setTimeout(() => {
            actions.setSubmitting(true);
            mutate({id: id, data: data});
            actions.setSubmitting(false);
        }, 1000);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                {isLoading && <div>Loading...</div>}

                <Box margin={1}><h1>EDITING POST</h1></Box>

                <Formik
                    initialValues={postData}
                    onSubmit={onFormSubmit}
                    validationSchema={schema}
                >
                    {({isSubmitting}) =>
                        <Form>
                            <Box margin={1}>
                                <Field component={TextField} fullWidth type="integer" name="User_ID" label="User_ID"
                                       helperText="Please Enter User_ID"/>
                            </Box>
                            <Box margin={1}>
                                <Field component={TextField} fullWidth type="text" name="Title" label="Title"
                                       helperText="Please Enter Post Title"/> <br/>
                            </Box>
                            <Box margin={1} sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}>
                                <Field component={TextField} fullWidth multiline
                                       maxRows={8} type="text" name="Text" label="Text"
                                       helperText="Please Enter Post Text"/> <br/>
                            </Box>
                            <Box margin={1}>
                                <Field component={TextField} fullWidth type="text" name="Visibility" label="Visibility"
                                       helperText="Please Enter Visibility" select
                                       variant="standard"
                                       InputLabelProps={{
                                           shrink: true,
                                       }}>
                                    {visibilityVars.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>))}
                                </Field>
                            </Box>
                            <Grid container columnSpacing={{ xs: 1}}>
                                <Grid item xs={8}>
                                    <Button
                                        sx={{margin: 1}}
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        type="submit"
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <Button
                                        href="/posts"
                                        sx={{margin: 1}}
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={11.6}>
                                    <ThemeProvider theme={theme}>
                                        <Button
                                            href="/"
                                            sx={{margin: 1}}
                                            variant="outlined"
                                            color="neutral"
                                            fullWidth
                                        >
                                            GO TO MAIN PAGE
                                        </Button>
                                    </ThemeProvider>
                                </Grid>
                            </Grid>
                        </Form>
                    }
                </Formik>
            </Grid>
        </Grid>
    )
}

export default EditPostForm;