import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.style";
import { useNavigate } from "react-router-dom";

export default function DirectoryItem({ cat }) {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(cat.route)
  }
  return (
    <DirectoryItemContainer onClick={navigateHandler}>
      <BackgroundImage
        style={{ backgroundImage: `url(${cat.imageUrl})` }}
      />
      <Body>
        <h2>{cat.title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}