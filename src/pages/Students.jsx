import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import request from "../service";
import { useParams } from "react-router-dom";
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
  ];
  const params = useParams();
  const { userId } = params;
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
      let { data } = await request.get("/teachers");
      let promises = [];
      data.forEach((el) => {
        promises.push(request.get(`teachers/${el.id}/students`), {
          params: {
            search: searchQuery,
          },
        });
      });
      Promise.all(promises)
        .then((el) => {
          // console.log(el);
          let allStudents = [];
          el.forEach((i) => {
            allStudents.push(...i.data);
            console.log(i);
            setData(allStudents);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // setData(data);
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
        await request.post(`teachers${userId}`, values);
      } else {
        await request.put(`teachers/${userId}/students${selected}`, values);
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

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const fullName = `${item.fullName}`.toLowerCase();
      return fullName.includes(searchQuery.trim().toLowerCase());
    });
    setData(filteredData);
  }, [searchQuery]);

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
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table
        loading={loading}
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <h2>Students ({data.length})</h2>
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
        okText={selected === null ? "Add students" : "save students "}>
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
            name="age"
            label="Age"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Teachers;
