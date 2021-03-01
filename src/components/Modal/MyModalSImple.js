import React,{Component} from 'react';
import { Modal,Effect} from 'react-dynamic-modal';
import SquareButton from '../CustomButtons/SquareButton';
import { makeStyles } from "@material-ui/core/styles";
import Aux from '../hoc/AuxComponent';
import './Modal.css';
 
const styles = {
   overlay: {
      position        : 'relative',
      top             : 0,
      left            : 0,
      right           : 0,
      bottom          : 0,
      zIndex          : 99999999,
      overflowY       : 'scroll',
      height          : '500px',
      backgroundColor : 'rgba(0, 0, 0, 0.3)'
    },
  
    content: {
      position                : 'relative',
      margin                  : '15% auto',
      width                   : '60%',
      border                  : '1px solid rgba(0, 0, 0, .2)',
      background              : '#fff',
      overflowY               : 'scroll',
      borderRadius            : '4px',
      outline                 : 'none',
      boxShadow               : '0 5px 10px rgba(0, 0, 0, .3)',
      
    }
 };


class MyModalSImple extends Component{
   constructor(props) {
      super(props);
  
      this.state = {
        classes : makeStyles(styles)
      }
    }

   render(){
      const { params,handleClicked, onRequestClose } = this.props;
      console.log("params: "+params)
      let index_pom=99;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.SlideFromBottom}
            className={this.state.classes.content,this.state.classes.overlay}
            >
               
               { params.map((item,index)=>{
                  //console.log("======== mapujem skrz itemy")
                  //console.log("pom index: "+index_pom)
                  //console.log("item: "+item.question)
                  //console.log(index_pom===item.question)
                  return <SquareButton key={index} clicked={handleClicked}>{item.name } </SquareButton>
                  //index_pom=item[0];

                
               }) }
               
         </Modal>
      );
   }
}

export default MyModalSImple;