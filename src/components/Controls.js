import React from 'react';
import { Button} from 'react-bootstrap';

const Controls = ({spend, disabled}) => {

  return (
        <Button className="spend" onClick={spend} disabled = {disabled} >
          Send $10 to Bob
         </Button>
  );
}

export default Controls;
