import styled from 'styled-components/native';

export const List = styled.FlatList.attrs({
    constentContainerStyle: { paddingHorizontal: 20 },
    showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
