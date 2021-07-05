import styled from 'styled-components/native';

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const Description = styled.Text.attrs({
    numberOfLines: 2,
})`
  color: #666;
  margin-top: 15px;
  line-height: 20px;
`;

export const MoreInfoText = styled.Text`
  margin-left: 6px;
  margin-top: 6px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-left: 5px;
`;
