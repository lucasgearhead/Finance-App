// components/RecordsList.js
import React from "react";
import RecordItem from "./RecordItem";
import styled from "styled-components";

const RecordsList = ({ records, onDeleteRecord, type }) => (
  <List>
    {records.map(
      (record, index) =>
        record.type === type && (
          <RecordItem
            key={index}
            record={record}
            onDeleteRecord={() => onDeleteRecord(index)}
          />
        )
    )}
  </List>
);

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export default RecordsList;
