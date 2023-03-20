import { useState, useRef, useEffect } from "react";
import { Form, Button, Input, List, Col, Row, Select } from "antd";
const { Option } = Select;
const HooksItems = () => {
  const [inputItem, setInputItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [editId, setEditId] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getLocalStorage();
  }, []);
  useEffect(() => {
    filterTodo();
    saveLocalStorage();
  }, [todos, filterValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const inputRef = useRef();
  const addTodos = () => {
    if (inputItem === "") {
      alert("Please Add Todo");
    } else if (inputItem !== "" && !editFlag) {
      setTodos([
        ...todos,
        {
          id: inputItem + new Date().getTime(),
          todoItem: inputItem,
          completed: false,
        },
      ]);
      setInputItem("");
      inputRef.current.focus();
    }
    if (editFlag) {
      setTodos(
        todos.map((todo) => {
          if (editId === todo.id) {
            return { ...todo, todoItem: inputItem };
          }
          return todo;
        })
      );
      setEditFlag(false);
      setInputItem("");
      inputRef.current.focus();
      return;
    }
  };

  const getFilterValue = (value) => {
    setFilterValue(value);
  };

  const filterTodo = () => {
    switch (filterValue) {
      case "completed":
        setFilterData(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilterData(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilterData(todos);
    }
  };

  const editTodo = (todoItem, id) => {
    setEditFlag(true);
    setInputItem(todoItem);
    setEditId(id);
  };

  const completedTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    const deletedItems = todos.filter((item) => item.id !== id);
    setTodos(deletedItems);
  };

  //Local Storage

  const saveLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalStorage = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localItem = JSON.parse(localStorage.getItem("todos"));
      setTodos(localItem);
    }
  };

  return (
    <Row style={{ marginTop: "25px" }}>
      <Col span={12} offset={6}>
        <Form name="horizontal_login" layout="inline">
          <Input.Group compact>
            <Input
              ref={inputRef}
              style={{ width: "calc(100% - 220px)" }}
              placeholder="add"
              name="name"
              value={inputItem}
              onChange={(e) => setInputItem(e.target.value)}
            />
            <Button type="primary" onClick={addTodos}>
              {!editFlag ? "Add Todo" : "Edit Todo"}
            </Button>
            <Select
              defaultValue="All"
              style={{
                width: 100,
                marginLeft: "10px",
              }}
              onChange={getFilterValue}
            >
              <Option value="all">All</Option>
              <Option value="completed">Completed</Option>
              <Option value="uncompleted">Uncompleted</Option>
            </Select>
          </Input.Group>
        </Form>

        <List
          dataSource={filterData}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => completedTodo(item.id)}>
                  Completed
                </Button>,
                <Button
                  type="link"
                  onClick={() => editTodo(item.todoItem, item.id)}
                >
                  Edit
                </Button>,
                <Button danger type="link" onClick={() => deleteTodo(item.id)}>
                  Delete
                </Button>,
              ]}
            >
              <span className={item.completed ? "completed" : null}>
                {item.todoItem}
              </span>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
export default HooksItems;
