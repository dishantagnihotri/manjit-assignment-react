import React from "react";
import styled from "styled-components";
import {
  EditOutlined,
  HeartOutlined,
  GlobalOutlined,
  DeleteOutlined,
  MailOutlined,
  HeartFilled,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

const { Meta } = Card;

const UserCard = ({ user, deleteUser, likeUser, editUser }) => (
  <Card
    cover={
      <img
        alt="example"
        src={`https://avatars.dicebear.com/v2/avataaars/${user?.username}.svg?options[mood][]=happy`}
        height={300}
        width="100%"
      />
    }
    actions={[
      user?.like === 1 ? (
        <HeartFilled
          key="unheart"
          style={{
            color: "red",
          }}
          onClick={() => likeUser(user)}
        />
      ) : (
        <HeartOutlined key="heart" onClick={() => likeUser(user)} />
      ),
      <EditOutlined key="edit" onClick={() => editUser(user.id)} />,
      <DeleteOutlined key="delete" onClick={() => deleteUser(user.id)} />,
    ]}
  >
    <Meta title={user?.name} />

    <InlineIconBlock>
      <MailOutlined key="email" />
      <span className="info-text">{user?.email}</span>
    </InlineIconBlock>

    <InlineIconBlock>
      <PhoneOutlined key="phone" />
      <span className="info-text">{user?.phone}</span>
    </InlineIconBlock>

    <InlineIconBlock>
      <GlobalOutlined key="website" />
      <span className="info-text">{user?.website}</span>
    </InlineIconBlock>
  </Card>
);

export default UserCard;

const InlineIconBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 5px;

  .info-text {
    margin-left: 10px;
  }
`;
