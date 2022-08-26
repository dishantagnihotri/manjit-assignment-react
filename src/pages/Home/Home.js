import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, message, Col, Spin, Button, Result } from "antd";

import UserEditModal from "components/UserEditModal";
import UserCard from "components/UserCard";
import { UserService } from "../../apis";

const Home = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editUserActive, setEditUserActive] = useState(null);

  const fetchUsers = async () => {
    setUsers(null);

    try {
      const { data } = await UserService.getAllUsers();

      if (data) setUsers(data);
    } catch (error) {
      message.error(error.message);
      setUsers("failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchUsers(), []);

  const onUserUpdate = (id, data) => {
    if (users.findIndex((user) => user.id === id)) {
      setUsers((prevState) => [
        ...prevState.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              ...data,
            };
          }

          return user;
        }),
      ]);
    } else {
      message.error("This user is not found");
    }
  };

  const onUserDelete = (id) =>
    setUsers((prevState) => prevState.filter((user) => user.id !== id));

  const onUserLike = (likedUser) =>
    setUsers((prevState) =>
      prevState.map((user) => {
        if (user.id === likedUser.id) {
          if (!user.like) {
            return { ...user, like: 1 };
          }
          if (user.like === 1) {
            return { ...user, like: 0 };
          }

          if (user.like === 0) {
            return { ...user, like: 1 };
          }
        }

        return user;
      })
    );

  const onUserEdit = (id) => {
    try {
      const user = users.filter((user) => user.id === id);

      if (user.length) {
        setEditUserActive(user[0]);
      } else {
        message.error("User with this id is not found");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onModalClose = () => {
    setEditUserActive(null);
  };

  return (
    <Main>
      <Row gutter={[16, 16]}>
        {(() => {
          if (loading || !users) {
            return (
              <Container>
                <Spin size="large" />
              </Container>
            );
          }

          if (!users.length || users === "failed") {
            return (
              <Container>
                <Result
                  status="warning"
                  title="Sorry, there is something wrong with the Api."
                  extra={
                    <Button type="primary" onClick={() => fetchUsers()}>
                      Try Again
                    </Button>
                  }
                />
              </Container>
            );
          }

          return users?.map((user) => (
            <Col xs={24} md={12} lg={8} xl={6} key={user.id}>
              <UserCard
                user={user}
                deleteUser={onUserDelete}
                likeUser={onUserLike}
                editUser={onUserEdit}
              />
            </Col>
          ));
        })()}
      </Row>

      <UserEditModal
        updateUser={onUserUpdate}
        editUser={onUserEdit}
        user={editUserActive}
        onModalClose={onModalClose}
      />
    </Main>
  );
};

export default Home;

const Main = styled.div`
  width: 98%;
  margin: 20px auto;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
`;
