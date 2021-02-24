import React,{Component} from 'react';
import { Modal,Effect} from 'react-dynamic-modal';
 
class MyModal extends Component{
   render(){
      const { params,onRequestClose } = this.props;
      
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.SlideFromBottom}>
               
               {params.map((questions, index) => {
                  return (
                     <ul key={index}>
                        {questions.map((subItems, sIndex) => {
                        return <li key={sIndex}> {subItems} </li>;
                        })}
                     </ul>
                  );
                  })}
         </Modal>
      );
   }
}

export default MyModal;