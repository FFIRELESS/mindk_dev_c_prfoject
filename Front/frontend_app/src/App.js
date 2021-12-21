import { PostContainer } from './containers/Post';

import postImg from './ellie2.jpg';
import './App.css';

const App = function () {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <PostContainer
          postHeader="Ellie from &quot;The Last Of Us&quot; will be filmed in 2022"
          postImg={<img src={postImg} className="App-postImg" alt="d" />}
          postText="it became known
                     that the action takes place in a post-apocalyptic future in the territory of the former
                     United States, twenty years after a global pandemic caused by a dangerously mutated virus.
                     In the story, the main characters - a teenage girl Ellie and an experienced smuggler Joel,
                     who received an order to accompany her, have to cross the ruined America to get to a safe zone
                     and save their lives. On this difficult path, they repeatedly encounter a host of obstacles,
                     dangers and opponents."
          postAuthor="Tokarenko Dmitrii"
        />
      </header>
    </div>
  );
};

export default App;
