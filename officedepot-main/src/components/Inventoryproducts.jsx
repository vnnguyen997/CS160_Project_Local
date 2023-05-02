import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Inventoryproduct from "./Inventoryproduct";

const Container = styled.div`
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 8px;
  border: 1px solid lightgray;
`;

export const Inventoryproducts = ({ itemProps, cart, setCart, userData }) => {
  const [searchWord, setSearchWord] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  useMemo(() => {
    if (itemProps) {
      const filtered = itemProps.filter((item) =>
        item.name.toLowerCase().includes(searchWord.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  }, [itemProps, searchWord]);

  const rows = filteredRows.length > 0 ? filteredRows : itemProps || [];

  const chunkedRows = useMemo(() => {
    const chunkSize = 6;
    const chunkedRows = [];

    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      chunkedRows.push(chunk);
    }

    return chunkedRows;
  }, [rows]);

  return (
    <div>
      <Container>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </SearchContainer>
        {filteredRows.length === 0 && searchWord !== "" ? (
          <div style={{ padding: "100px" }}>
            <p>No results matching your search</p>
          </div>
        ) : rows.length > 0 ? (
          <div>
            {chunkedRows.map((chunk, index) => (
              <Row key={`row-${index}`}>
                {chunk.map((item) => (
                  <Inventoryproduct
                    item={item}
                    key={item.inventory_id}
                    cart={cart}
                    setCart={setCart}
                    userData={userData}
                  />
                ))}
              </Row>
            ))}
          </div>
        ) : (
          <div style={{ padding: "100px" }}>
            <p>No inventory in this section</p>
          </div>
        )}
      </Container>
    </div>
  );
};
