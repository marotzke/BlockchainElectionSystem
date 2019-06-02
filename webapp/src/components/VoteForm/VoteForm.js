import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { BrowserRouter as withRouter } from "react-router-dom";

export default class VoteForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        candidateId: -1,
        voterId: -1
      };
    }
    vote = (e) => {
      if(this.state.voterId == -1){
        alert("ID do Eleitor não específicado")
      }else if(this.state.candidateId == -1 ){
        alert("Código do Candidato não específicado")
      }else{
        fetch('http://localhost:8545/vote/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            candidateId: this.state.candidateId,
            voterId: this.state.voterId,
          })
        }).then((response) => {
          if(response.status != 200){
            alert("Algo de errado ocorreu")
          }else{
            withRouter(({ history }) => {
              history.push('/results')
          })
          }
        })
      } 
    }

    handlecandidateId (e) { this.setState({candidateId:e.target.value}); }
    handlevoterId (e) { this.setState({voterId:e.target.value}); }

    render() {
        return (

            <Form>
            <Form.Field>
              <label>Código do Candidato</label>
              <input onChange={this.handlecandidateId.bind(this)}/>
            </Form.Field>
            <Form.Field>
              <label>ID do Eleitor</label>
              <input onChange={this.handlevoterId.bind(this)}/>
            </Form.Field>
            <Button type='submit' onClick={this.vote}>Votar</Button>
          </Form>
          // </div>
        )
    }
}
