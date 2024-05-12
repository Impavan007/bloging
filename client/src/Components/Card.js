import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

function BasicExample() {
  const {currentUser} = useSelector(state=>state.user);
  return (
    <Card style={{width:"80%"}}>
      <Card.Img variant="top" src={currentUser?currentUser.imgUrl:"/assets/Vision00015.png"} />
      <Card.Body>
        <Card.Title>{currentUser.userName}</Card.Title>
        <Card.Text>
        {currentUser.bio|| " Some quick example text to build on the card title and make up the bulk of the card's content."}
        </Card.Text>
        <Button variant="primary">Visit profile</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;