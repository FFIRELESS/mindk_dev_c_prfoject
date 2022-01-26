import {Box, Button} from "@mui/material";

export var HeaderContainer = function () {

    return (
        <div>
            <h1>MAIN PAGE</h1>
            <Box margin={1}>
                <Button
                    href="/posts"
                    variant="contained"
                >
                    SHOW POSTS
                </Button>
            </Box>
            <Box margin={1}>
                <Button
                    href="/add_post"
                    variant="contained"
                >
                    ADD POST
                </Button>
            </Box>
            <Box margin={1}>
                <Button
                    href="/users"
                    variant="contained"
                >
                    SHOW USERS
                </Button>
            </Box>
            <Box margin={1}>
                <Button
                    href="/users/1"
                    variant="contained"
                >
                    YOUR PROFILE
                </Button>
            </Box>
        </div>
    );
};