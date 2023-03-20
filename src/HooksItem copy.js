import { useState, useRef, useEffect } from "react";
import { Form, Button, Input, List, Col, Row, Select } from "antd";
const { Option } = Select;
const HooksItems = () => {
  const [name, setName] = useState("");
  const [list, addList] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterStatus, setfilterStatus] = useState("");
  const [filterTodos, setFiltertodos] = useState([]);

  useEffect(() => {
    filterTodo();
  }, [list, filterStatus]);

  const inputElement = useRef();
  const handleSubmit = (e) => {
    console.log("add");
    e.preventDefault();
    if (name === "") {
      alert("Please Add Todo");
    } else if (name !== "" && !editFlag) {
      addList([
        ...list,
        { id: name + new Date().getTime(), name, completed: false },
      ]);
      setName("");
      inputElement.current.focus();
    } else {
      addList(
        list.map((item) => {
          if (item.id === editItem) {
            return { id: editItem, name };
          }
          return item;
        })
      );
      setEditFlag(false);
      setName("");
      return;
    }
  };
  const deleteTodo = (e, key) => {
    e.preventDefault();
    const filterList = list.filter((list) => list.id !== key);
    addList(filterList);
  };
  const HandleEditTodo = (name, id) => {
    setEditFlag(true);
    setName(name);
    setEditItem(id);
  };
  const HandleCompleted = (id) => {
    addList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const selectHandle = (value) => {
    setfilterStatus(value);
  };
  const filterTodo = () => {
    switch (filterStatus) {
      case "uncompleted":
        setFiltertodos(list.filter((item) => item.completed === false));
        break;
      case "completed":
        setFiltertodos(list.filter((item) => item.completed === true));
        break;
      default:
        setFiltertodos(list);
        break;
    }
    // setFiltertodos(
    //   list.filter((item) => {
    //     if (filterStatus === "uncompleted") {
    //       return item.completed === false;
    //     }
    //     if (filterStatus === "completed") {
    //       return item.completed === true;
    //     }
    //     return item;
    //   })
    // );
  };
  return (
    <Row style={{ marginTop: "25px" }}>
      <Col span={12} offset={6}>
        <Form name="horizontal_login" layout="inline">
          <Input.Group compact>
            <Input
              style={{ width: "calc(100% - 220px)" }}
              placeholder="add"
              ref={inputElement}
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="primary" onClick={handleSubmit}>
              {!editFlag ? "Add Todo" : "Edit Todo"}
            </Button>
            <Select
              defaultValue="All"
              style={{
                width: 100,
                marginLeft: "10px",
              }}
              onChange={selectHandle}
            >
              <Option value="all">All</Option>
              <Option value="completed">Completed</Option>
              <Option value="uncompleted">Uncompleted</Option>
            </Select>
          </Input.Group>
        </Form>

        <List
          dataSource={filterTodos}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  id={item.id}
                  onClick={(e) => HandleCompleted(item.id)}
                >
                  Completed
                </Button>,
                <Button
                  type="link"
                  id={item.id}
                  onClick={(e) => HandleEditTodo(item.name, item.id)}
                >
                  Edit
                </Button>,
                <Button
                  danger
                  type="link"
                  id={item.id}
                  onClick={(e) => deleteTodo(e, item.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <span className={item.completed ? "completed" : null}>
                {item.name}
              </span>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};
export default HooksItems;
