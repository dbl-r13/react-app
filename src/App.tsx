import axios, { Axios, AxiosError, CanceledError } from "axios";

import Alert from "./components/Alert";
import Button from "./components/Button";
import Cart from "./components/Cart";
import categories from "./expense-tracker/categories";
import ExpandableText from "./components/ExpandableText";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import Form from "./components/Form";
import Likes from "./components/Likes";
import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar";
import MiniProject from "./components/MiniProject";
import ProductList from "./components/ProductList";

import { useEffect, useState } from "react";
import { BsFillCalendarFill } from "react-icons/bs";

const items = ["New York", "San Fransico", "Tokyo", "London", "Paris"];
const fakeProducts = await fetch("https://fakestoreapi.com/products?limit=5")
  .then((res) => res.json())
  .then((json) => Array.of(json)[0].map((obj: any) => obj.title));

console.log("FAKE PRODUCTS:", await fakeProducts);

function App() {
  /*
  Below function is an example of function expression
  const handleSelectItem = (item: string) => {
    console.log(item);
   }; */
  const [alertVisible, setAlertVisibility] = useState(false);
  const [cartItems, setCartItems] = useState(fakeProducts);
  const [prodCategory, setProdCategory] = useState("");
  const [isFullText, setIsFullText] = useState(false);
  const [likesVisible, setLikesVisibility] = useState(false);
  const expensesData = [
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 11, category: "Utilities" },
    { id: 3, description: "ccc", amount: 12, category: "Utilities" },
    { id: 4, description: "ddd", amount: 13, category: "Utilities" },
  ];
  const [expenses, setExpenses] = useState(expensesData);
  const [selectedCategory, setSelectedCategory] = useState("");
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  //TODO: add AxiosUser component and make sure all things function properly once added.
  //AxiosUser Section: added on page without component created
  interface AxiosUser {
    id: number;
    name: string;
  }
  const [users, setUsers] = useState<AxiosUser[]>([]);
  const [axiosError, setAxiosError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    /** const fetchUsers = async () => {
     try {
       const res = await axios.get<AxiosUser[]>(
         "https://jsonplaceholder.typicode.com/users",
         { signal: controller.signal }
         );
         setUsers(res.data);
        } catch (err) {
          if (err instanceof CanceledError) return;
          setAxiosError((err as AxiosError).message);
        }
      };
      fetchUsers();
      */
    const controller = new AbortController();

    setLoading(true);
    axios
      .get<AxiosUser[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setAxiosError(err.message);
        setLoading(false);
      });
    /**.finally(() => setLoading(false));
     * All Promises have a .finally() method that can be called and is the last things that is run after the Promise is either resolved or rejected.
     *
     * IMPORTANT NOTE: The .finally() method does not work in development mode. Trying to find documentation on why but know that it does not function correctly in Development mode which is why code above is duplicated.
     *
     */
    return () => controller.abort();

    /**
     * This is a way that can be used in useEffect. The above way is just another approach to doing the same thing.
     * .then((res) => setUsers(res.data))
     * .catch((err) => setAxiosError(err.message));
     */
  }, []);

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Mosh" };
    setUsers([...users, newUser]);
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, newUser)
      .then(({ data: savedUser }) => setUsers([...users, savedUser]))
      .catch((err) => {
        setAxiosError(err.message);
        setUsers(originalUsers);
      });
  };
  const deleteUser = (user: AxiosUser) => {
    const originalUsers = [...users];
    console.log(`User ${user.name}, id: ${user.id} was deleted`);

    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .catch((err) => {
        setAxiosError(err.message);
        setUsers(originalUsers);
      });
  };
  const updateUser = (user: AxiosUser) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: `${user.name} !` };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    axios
      .patch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        updatedUser
      )
      .catch((err) => {
        setAxiosError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <div>
      <div className="mb-3">
        <h2>Axios User List:</h2>
        {axiosError && <p className="text-danger">{axiosError}</p>}
        {isLoading && <div className="spinner-border"></div>}
        <button className="btn btn-dark mb-3" onClick={addUser}>
          Add
        </button>
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item d-flex justify-content-between"
              key={user.id}
            >
              {user.name}
              <div>
                <button
                  className="btn btn-outline-secondary mx-1"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <select
          name=""
          id=""
          className="form-select"
          onChange={(event) => setProdCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing">Clothing</option>
          <option value="HouseHold">Household</option>
        </select>
        <ProductList category={prodCategory} />
      </div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />

      <Form />
      <hr />

      {alertVisible && (
        <Alert
          onClose={() => {
            setAlertVisibility(false);
            console.log("Closed button was clicked and Alert was closed ");
          }}
        >
          Hello <span>World</span>
        </Alert>
      )}
      <Button
        color="success"
        onClick={() => {
          setAlertVisibility(true);
          console.log("Sucess button was clicked ");
        }}
      >
        Success
      </Button>
      <hr />
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={(item: string) => {
          console.log(`${item} was selected`);
        }}
      />
      <hr />
      <BsFillCalendarFill color="lightblue" size="40" />
      <hr />
      <Likes
        isClicked={likesVisible}
        onClick={() => {
          setLikesVisibility(!likesVisible);
          console.log(
            `Toggled heart to ${likesVisible ? "empty state" : "full state"}`
          );
        }}
      />
      <hr />
      <NavBar cartItemsCount={cartItems.length} />
      <Cart
        cartItems={cartItems}
        onClear={() =>
          cartItems.length > 0 ? setCartItems([]) : setCartItems(fakeProducts)
        }
      />
      <ExpandableText
        isFullText={isFullText}
        maxCount={35}
        onClick={() => {
          setIsFullText(!isFullText);
          console.log(
            `Expandable Text is now showing ${
              isFullText ? "truncated text" : "full text"
            }`
          );
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
        debitis quisquam praesentium eius alias placeat at minus impedit
        nesciunt aliquid maxime, officia eaque velit laborum, ex odio voluptas
        voluptatem quaerat?
      </ExpandableText>
    </div>
  );
}

{
}
export default App;
