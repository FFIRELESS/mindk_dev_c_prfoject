import {useParams} from "react-router-dom";
import {NotFound} from "../NotFound";

export var ValidatePostDigits = function () {
    const {id} = useParams();
    if (id.match(/^\d+$/)) {
        return <Post postId={id}/>;
    }
    return <NotFound/>;
}

export var ValidatePostUpper = function () {
    const {id} = useParams();
    if (id.match(/^[A-Z]+$/)) {
        return <Post postId={id}/>;
    }
    return <NotFound/>;
}

export var ValidatePostFile = function () {
    const {id} = useParams();
    if (id.match(/.(.+)(doc|pdf|jpeg)$/)) {
        return <Post postId={id}/>;
    }
    return <NotFound/>;
}

export var ValidateDate = function () {
    const {date} = useParams();
    const currentDate = new Date().toISOString().substr(0, 10);
    if (date.match(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/) &&
    currentDate >= date) {
        return <div>Requested date: {date} Current: {currentDate}</div>;
    }
    return <NotFound/>;
}

export var Post = function ({posts}) {
  return (
      <>
          {
              posts.map(({Post_ID, User_ID, Title, Text, Timestamp, Visibility}) =>
              (<div key={Post_ID}>
                  Post #{Post_ID} User #{User_ID} <b>{Title}</b>
                  <div> {Text} </div>
                  <div> {Timestamp} </div>
                  <div>{Visibility} </div> <br/>
              </div>))
          }
      </>
  );
};
