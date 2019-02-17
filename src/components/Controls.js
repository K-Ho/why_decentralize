import React from 'react';
import { Button} from 'react-bootstrap';

const Controls = ({spend}) => {
  return (
        <Button className = "spend" onClick={spend}>
          Send $10 to Bob
         </Button>
  );
}

export default Controls;
