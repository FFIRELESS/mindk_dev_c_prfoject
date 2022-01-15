import './App.css';
import UserProfileContainer from "./containers/userProfile";

const App = function () {
  return (
    <div className="App">
      <header className="App-header">
            <UserProfileContainer firstName="first" lastName="last" birthdayYear={1923}
                                  user={{
                                      name: 'test',
                                      age: 23,
                                      avatar: {
                                          file: {
                                              id: 1,
                                              name: '123.jpg',
                                              path: '/files/1.jpg'
                                          }
                                      },
                                      files: [
                                          {
                                              id: 1,
                                              name: '123.jpg',
                                              path: '/files/1.jpg'
                                          },
                                          {
                                              id: 1,
                                              name: '123.jpg',
                                              path: '/files/1.jpg'
                                          }],
                                      addrr: {
                                          main: {
                                              line1: 'test',
                                              line2: 'test',
                                              city: 'test',
                                              zip: 1234
                                          },
                                          alt: {
                                              line1: 'test',
                                              line2: 'test',
                                              city: 'test',
                                              zip: 1234
                                          }
                                      },
                                      friends: [
                                          {
                                              name: 'test',
                                              age: 23,
                                              avatar: {
                                                  file: {
                                                      id: 1,
                                                      name: '123.jpg',
                                                      path: '/files/1.jpg'
                                                  }
                                              },
                                              files: [
                                                  {
                                                      id: 1,
                                                      name: '123.jpg',
                                                      path: '/files/1.jpg'
                                                  },
                                                  {
                                                      id: 1,
                                                      name: '123.jpg',
                                                      path: '/files/1.jpg'
                                                  }],
                                              addrr: {
                                                  main: {
                                                      line1: 'test',
                                                      line2: 'test',
                                                      city: 'test',
                                                      zip: 1234
                                                  },
                                                  alt: {
                                                      line1: 'test',
                                                      line2: 'test',
                                                      city: 'test',
                                                      zip: 1234
                                                  }
                                              }
                                          }
                                      ]
                                  }}>
            </UserProfileContainer>
      </header>
    </div>
  );
};

export default App;
