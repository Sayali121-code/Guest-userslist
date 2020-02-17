import React from 'react';
import './App.scss';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface IAppState {
  users?: {
    name: string, 
    email: any,
    phone: any,
    website: string,
    id: string
  }[];
  //like: boolean,
  delete: any,
  search: string,
  likes: string[],
  showModal:boolean,
  name: string,
  id: string,
  email: any,
  phone:any,
  website: any
}

class App extends React.Component<{},IAppState> {
  constructor(props:any){ 
super(props)
    this.state = {      
      users: [{
        name: '',
        email: '',
        phone: '',
        website: '',
        id: '' 
      }],
      likes:[],
     // like: false,
      delete: "",
      search: "",
      showModal: false,
      name: '',
      id:'',
      email: '',
      phone:'',
      website: ''
 
    }
    
  }
componentDidMount() {
  axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    const users = res.data
  //  console.log(">>res", res);
   this.setState({users})
  })
}

handlelike = (event:any) => {
  console.log("clicked-id", event.id)

  if(this.state.likes.includes(event.id)) {
    const b= this.state.likes.filter(e => e!== event.id)  
    console.log('>>b',b)
    this.setState ({
      likes:b
    })
  }
  else {
    const a =this.state.likes
    a.push(event.id)
    console.log('>> a', a);
    this.setState ({
      likes: a
    })
  } 
}

handleDelete =(del:any) => {
//console.log("Del", del.id)
const remove= this.state.users?.filter(rem => rem.id !== del.id)
this.setState ({
users: remove
})
}

searchGuest = (text:any) => {
 this.setState({
     search:text.target.value
  })
}

handleClose = () => {
 this.setState({
   showModal: false
 })
}

handleEdit = (edi:any) => {
  console.log("Edit",edi.name, edi.email)
  this.setState({
   showModal: true,
   name: edi.name,
   id: edi.id,
   email: edi.email,
   phone: edi.phone,
   website: edi.website
 })
}

saveChanges = () => {
 //console.log("Saved data:",this.state.name,"id--", this.state.id)
 const changes = (this.state.users || []).map((n:any) => {
  if( n.id === this.state.id){
  n.name = this.state.name
  n.email = this.state.email
  n.phone = this.state.phone
  n.website = this.state.website
  }
 return n
})
console.log('>> n', changes);
  this.setState({
   showModal: false,
   users: changes  
 }) 
}

render() {
  return (
    <div className="fluid-container">
    <div className="row">
      <div className="Heading-searchbar">
       <h1>Guest User List</h1>
       <form>
         <br />
         <input className="input-search" 
         type="text" 
         name="guest_name" 
         value={this.state.search} 
         placeholder="Type name to search"
         onChange={this.searchGuest}
         />
       </form>
      </div>
   </div>
   

   <div className="row">
   {/* ---------------------------- Start Users Cards -----------------------*/}
   {(this.state.users || []).map((info,index) => {
   //  console.log("Show",info);
   if(info.name.toLowerCase().includes(this.state.search.toLowerCase()))
     return (
     <div key={index} className="users-card">
      <div className="awtar">
      <img alt="Awtar" src={`https://avatars.dicebear.com/v2/avataaars/${info.name}.svg`} />
      </div>

      <div className="users-details">
       <p>{info.name} </p>
        <div className="contact-deatils">
        <i className="fa fa-envelope" aria-hidden="true"></i> <span className="guest-info"> {info.email}</span> <br/>
        <i className="fa fa-phone" aria-hidden="true"></i> <span className="guest-info">{info.phone}</span> <br />
        <i className="fa fa-globe" aria-hidden="true"></i> <span className="guest-info">{info.website}</span>
        </div>
       </div>
      <div className="like-edit-delete">
  {/*--------- Like --------- */}
        <span onClick={()=>this.handlelike(info)}>
           {this.state.likes.includes(info.id) ? <i className="fa fa-heart" aria-hidden="true"></i>  :  <i className="fa fa-heart-o" aria-hidden="true"></i>} 
        </span>
  {/*--------- Edit --------- */}
        <span onClick={() => this.handleEdit(info)} >
          <i className="fa fa-pencil" aria-hidden="true"></i> 
        </span>
  {/*--------- Delete --------- */}
        <span onClick={()=>this.handleDelete(info)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </span>
      </div>
    </div>
     )
   })}
  {/* ---------------------------- End Users Cards -----------------------*/}     
   </div>  
   {/* Modal Form */}
  <div>
    <Modal isOpen={this.state.showModal} >
      <ModalHeader closebutton = "true">
      </ModalHeader>
    {/*  {this.props.proj_info.map((ele:any, i: number) => )} 
      */}  
        <ModalBody>
            <Form>
            <FormGroup>
              <h2>Edit user</h2>
              <Label>Name </Label>
              <Input 
              type="text" 
              value={this.state.name}
              onChange={event => this.setState({name: event.target.value})}
              required/>  
              
              <br /> <br />

              <Label>Email </Label>
              <Input 
              type="text" 
              value={this.state.email} 
              onChange={event => this.setState({email: event.target.value})}
              required/>
              <br/> <br />

              <Label>Phone </Label>
              <Input 
              type="text" 
              value={this.state.phone}
              onChange={event => this.setState({phone: event.target.value})}
              required/>
              <br/> <br />

              <Label>Website </Label>
              <Input 
              type="text" 
              value={this.state.website}
              onChange={event => this.setState({website: event.target.value})}
              required/>
              <br/> <br />
              
            </FormGroup>
          </Form>
        </ModalBody>
        
         <ModalFooter>
          <Button onClick={this.handleClose} className='btn btn-default' >
            Close
          </Button>

          <Button onClick={this.saveChanges} className='btn btn-primary'>
            Save the Changes
          </Button>
          </ModalFooter> 
    </Modal>
    </div> 
  </div>
  )
 }
}

export default App;


