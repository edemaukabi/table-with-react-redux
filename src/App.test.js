import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "./App";
import rootReducer from "./reducers/reducers";
import { fetchUsers, fetchUsersRequest } from "./actions/userActions";
import { useSelector, useDispatch } from "react-redux";


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

describe("App Component", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store;
  beforeEach(() => {
    store = mockStore({
      data: {
        users: [],
        loading: false,
        error: null,
      },
    });
  });

  test("renders App component without errors", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("Frontend Coding Assessment")).toBeInTheDocument();
  });

  test("displays loading text when loading is true", () => {
    store.getState().data.loading = true;
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays error message when error occurs", () => {
    const errorMessage = "Something went wrong!";
    store.getState().data.error = errorMessage;
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

});


describe("Reducers", () => {
  test("dataReducer handles FETCH_USERS_REQUEST correctly", () => {
    const initialState = {
      users: [],
      loading: false,
      error: null,
    };
    const action = { type: "FETCH_USERS_REQUEST" };
    const nextState = rootReducer(undefined, action);

    expect(nextState.data).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  test("dataReducer handles FETCH_USERS_SUCCESS correctly", () => {
    const initialState = {
      users: [],
      loading: true,
      error: null,
    };
    const users = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      },
    ];
    const action = { type: "FETCH_USERS_SUCCESS", payload: users };
    const nextState = rootReducer(initialState, action);

    expect(nextState.data).toEqual({
      ...initialState,
      users,
      loading: false,
      error: null,
    });
  });

  test("dataReducer handles FETCH_USERS_FAILURE correctly", () => {
    const initialState = {
      users: [],
      loading: true,
      error: null,
    };
    const error = "Failed to fetch users";
    const action = { type: "FETCH_USERS_FAILURE", payload: error };
    const nextState = rootReducer(initialState, action);

    expect(nextState.data).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });
});
