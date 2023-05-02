import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ImageSelector from "../components/ImageSelector";
import axios from "axios";
import {
  CREATE_INVENTORY_ENDPOINT,
  DELETE_INVENTORY_ENDPOINT,
  UPDATE_INVENTORY_ENDPOINT,
  GET_ALL_INVENTORY_ENDPOINT,
} from "../constants";
const Inventory = () => {
  const [data, setData] = useState([]);
  const [addingRow, setAddingRow] = useState(false);
  const [newRowData, setNewRowData] = useState({
    id: "",
    name: "",
    description: "",
    weight: "",
    price: "",
    itemgroup: "",
    stock: "",
    image: "",
    warehouse: "",
  });
  const [showModal, setModalShow] = useState(false);
  const [rowBeingEdited, setRowBeingEdited] = useState(0);
  const columnKeys = [
    "id",
    "name",
    "description",
    "itemgroup",
    "weight",
    "price",
    "stock",
    "image",
    "warehouse",
  ];

  useEffect(() => {
    async function getAllInventory() {
      axios
        .get(GET_ALL_INVENTORY_ENDPOINT)
        .then((response) => {
          let itemObjects = response.data;
          const newArray = itemObjects.map((item) => {
            return {
              ...item,
              id: item.inventory_id,
              inventory_id: undefined,
            };
          });
          setData(newArray);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getAllInventory();
  }, []);
  const addRow = () => {
    setAddingRow(true);
    setRowBeingEdited(-1);
  };

  const saveRow = () => {
    const { id, ...dataToPass } = newRowData;
    axios
      .post(CREATE_INVENTORY_ENDPOINT, dataToPass)
      .then((response) => {
        const newRowWithId = {
          ...newRowData,
          id: response.data["inventory_id"],
        };
        setData([...data, newRowWithId]);
        setNewRowData({
          id: "",
          name: "",
          description: "",
          weight: "",
          price: "",
          itemgroup: "",
          stock: "",
          image: "",
        });
        setAddingRow(false);
        setRowBeingEdited(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  const handleDropDown = (eventKey) => {
    setNewRowData({ ...newRowData, warehouse: eventKey });
  };

  const handleEditDropDown = (eventKey, index) => {
    const updatedData = data.map((row, i) => {
      if (i === index) {
        return { ...row, warehouse: eventKey };
      }
      return row;
    });
    setData(updatedData);
  };

  const handleEditInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = data.map((row, i) => {
      if (i === index) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setData(updatedData);
  };

  const toggleEdit = (index) => {
    if (data[index].editing) {
      setRowBeingEdited(0);
      const { id, editing, ...dataToPass } = data[index];
      axios
        .put(UPDATE_INVENTORY_ENDPOINT + id, dataToPass)
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setRowBeingEdited(index);
    }
    setData(
      data.map((row, i) =>
        i === index ? { ...row, editing: !row.editing } : row
      )
    );
  };

  const handleDelete = (indexToDelete) => {
    axios
      .delete(
        DELETE_INVENTORY_ENDPOINT + "?inventory_id=" + data[indexToDelete].id
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        setData((prevData) =>
          prevData.filter((_, index) => index !== indexToDelete)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleImageChange = (image) => {
    // Handle the selected image here
    if (rowBeingEdited == -1) {
      setNewRowData({ ...newRowData, image: image.name });
    } else {
      const updatedData = data.map((row, i) => {
        if (i === rowBeingEdited) {
          return { ...row, image: image.name };
        }
        return row;
      });
      setData(updatedData);
    }
    console.log(image);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "3%" }}>ID</th>
            <th style={{ width: "15%" }}>Name</th>
            <th style={{ width: "30%" }}>Description</th>
            <th style={{ width: "15%" }}>Item Group</th>
            <th style={{ width: "7%" }}>Weight</th>
            <th style={{ width: "7%" }}>Price</th>
            <th style={{ width: "7%" }}>Stock</th>
            <th style={{ width: "10%" }}>Image</th>
            <th style={{ width: "7%" }}>Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={row.stock ? "" : "table-warning"}>
              {columnKeys.map((key) => {
                if (key === "editing") return null;
                const value = row[key];
                return (
                  <td key={key}>
                    {row.editing ? (
                      key === "image" ? (
                        <Button onClick={handleModalShow}>
                          {data[index].image}
                        </Button>
                      ) : key !== "warehouse" ? (
                        <Form.Control
                          type={key === "id" ? "number" : "text"}
                          disabled={key === "id"}
                          name={key}
                          value={value}
                          onChange={(e) => handleEditInputChange(e, index)}
                        />
                      ) : (
                        <Dropdown
                          name={key}
                          onSelect={(eventKey) =>
                            handleEditDropDown(eventKey, index)
                          }
                        >
                          <Dropdown.Toggle
                            variant="primary"
                            id="warehouse-dropdown"
                          >
                            {value}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item eventKey="Warehouse 1">
                              Warehouse 1
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="Warehouse 2">
                              Warehouse 2
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
              <td>
                <Button onClick={() => toggleEdit(index)}>
                  {row.editing ? "Save" : "Edit"}
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {addingRow && (
            <tr>
              {columnKeys.map((key) => (
                <td key={key} className={key}>
                  {key === "image" ? (
                    <Button onClick={handleModalShow}>
                      {newRowData.image ? newRowData.image : "Select"}
                    </Button>
                  ) : key !== "warehouse" ? (
                    <Form.Control
                      type={key === "id" ? "number" : "text"}
                      disabled={key === "id"}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={newRowData[key]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Dropdown name={key} onSelect={handleDropDown}>
                      <Dropdown.Toggle
                        variant="primary"
                        id="warehouse-dropdown"
                      >
                        {newRowData[key]}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Warehouse 1">
                          Warehouse 1
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Warehouse 2">
                          Warehouse 2
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </Table>
      {!addingRow ? (
        <Button onClick={addRow}>Add Row</Button>
      ) : (
        <Button onClick={saveRow}>Save Row</Button>
      )}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageSelector onImageChange={handleImageChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Inventory;
