import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import { useEffect, useState } from "react";
import request from "../service";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";

const Teachers = () => {
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (data, row) => {
        return (
          <img
            height={50}
            src={data}
            alt={row.fullName}
            style={{ borderRadius: "50%" }}
          />
        );
      },
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "isMarried",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (data) => (data ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => edit(record.id)}>Edit</Button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            <Button onClick={() => deleteData(record.id)}>Delete</Button>
          </Popconfirm>
          <Button>
            <Link to={`/teacherStudents/${record.id}`}>See students</Link>
          </Button>
        </Space>
      ),
    },
  ];
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      let { data } = await request.get("/teachers", {
        params: {
          search: searchQuery,
        },
      });
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (selected == null) {
        await request.post("teachers", values);
      } else {
        await request.put(`teachers/${selected}`, values);
      }

      getData();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function edit(id) {
    setSelected(id);
    setIsModalOpen(true);
    let { data } = await request.get(`teachers/${id}`);
    form.setFieldsValue(data);
  }

  async function deleteData(id) {
    try {
      // const confirmed = window.confirm("Are you sure to delete the employee?");
      if (confirm) {
        await request.delete(`teachers/${id}`, {
          params: {
            search: searchQuery,
          },
        });
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const filteredData = data.filter((item) => {
    const fullName = `${item.fullName}`.toLowerCase();
    return fullName.includes(searchQuery.trim().toLowerCase());
  });
  console.log(filteredData);

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const onSearch = async (value, _e, info) => {
    try {
      setLoading(true);
      let { data } = await request.get(`/teachers?search=${value}`, {
        params: {
          search: value,
        },
      });
      setData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Table
        loading={loading}
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}>
            <h2>Teachers ({data.length})</h2>
            <Search
              style={{ width: "300px" }}
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button type="primary" onClick={showModal}>
              Add teachers
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Teachers Data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selected === null ? "Add teacher" : "save teacher "}>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off">
          <Form.Item
            name="avatar"
            label="Image"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="isMarried"
            valuePropName="checked"
            rules={[
              {
                required: true,
              },
            ]}>
            <Checkbox>Is Married</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Teachers;
