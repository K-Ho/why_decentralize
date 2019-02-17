import React from 'react';
import { Button} from 'react-bootstrap';

const Controls = ({spend, disabled}) => {

  return (
        <Button className="spend" onClick={spend} >
          Mint $10 to @ribbit
         </Button>
  );
}

export default Controls;
