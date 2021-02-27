import React,{Component} from 'react';
import { Modal,Effect} from 'react-dynamic-modal';

import ListItem from "../ListComponent/ListItem/ListItem";
 
class MyModalZaloha extends Component{
   render(){
      const { params,counts, onRequestClose } = this.props;
      //console.log("params: "+params)
      let index_pom=99;
      let vypis_pom=null;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.SlideFromBottom}>
               <form>
               { params.map((item,index)=>{
                  //console.log("======== mapujem skrz itemy")
                  //console.log("pom index: "+index_pom)
                  //console.log("item: "+item)
                  if(index_pom===item[0]){
                     //console.log("true: "+index_pom)
                     return (
                        <div key={index} > 
                           <ListItem  >{item[3] } </ListItem>
                        </div>
                      )
                  }else{
                     //console.log("false: "+index_pom)
                     index_pom=item[0];
                     return (
                        <div key={index} > 
                           <br></br>
                           <h3>{ item[0] + "  " +item[1] } </h3>
                           <ListItem  >{item[3] } </ListItem>
                        </div>
                      )
                  }
                  //index_pom=item[0];

                
               }) }
               <input type="submit" value="Submit" />
               </form>
               
         </Modal>
      );
   }
}

export default MyModalZaloha;