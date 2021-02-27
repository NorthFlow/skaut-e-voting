import React,{Component} from 'react';
import { Modal,Effect} from 'react-dynamic-modal';
import SquareButton from '../CustomButtons/SquareButton';
import Aux from '../hoc/AuxComponent';

import ListItem from "../ListComponent/ListItem/ListItem";
 
class MyModal extends Component{
   render(){
      const { params,counts, onRequestClose } = this.props;
      //console.log("params: "+params)
      let index_pom=99;
      let vypis_pom=null;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.SlideFromBottom}>
               
               { params.map((item,index)=>{
                  //console.log("======== mapujem skrz itemy")
                  //console.log("pom index: "+index_pom)
                  //console.log("item: "+item)
                  if(index_pom===item[0]){
                     //console.log("true: "+index_pom)
                     return (
                           <SquareButton key={index}>{item[3] } </SquareButton>
                      )
                  }else{
                     //console.log("false: "+index_pom)
                     index_pom=item[0];
                     return (
                        <Aux key={index} > 
                           <br></br>
                           <h3>{ item[0] + "  " +item[1] } </h3>
                           <SquareButton  >{item[3] } </SquareButton>
                        </Aux>
                      )
                  }
                  //index_pom=item[0];

                
               }) }
               
         </Modal>
      );
   }
}

export default MyModal;