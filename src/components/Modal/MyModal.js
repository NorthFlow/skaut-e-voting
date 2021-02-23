import React,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
 
class MyModal extends Component{
   render(){
      const { text,onRequestClose } = this.props;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.SlideFromBottom}>
            <h1>What you input : {text}</h1>
            <button>01</button>
            <button>02</button>
            <button>03</button>
         </Modal>
      );
   }
}

export default MyModal;