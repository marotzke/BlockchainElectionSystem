import React, { Component, useState } from 'react'
import { Button, Form, Step, Icon } from 'semantic-ui-react'

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
        fetch('https://30c8b59d-a72c-4066-a6a1-f80330782f8f.mock.pstmn.io/vote/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            candidateId: this.state.candidateId,
            voterId: this.state.voterId,
          })
        }).then(alert("hello"))
      }
    }

    handlecandidateId (e) { this.setState({candidateId:e.target.value}); }
    handlevoterId (e) { this.setState({voterId:e.target.value}); }

    render() {
        return (
        //   <div>
        //   <Step.Group>
        //   <Step active link>
        //     {/* <Icon name='truck' /> */}
        //     <Step.Content>
        //       <Step.Title>Eleitor</Step.Title>
        //       <Step.Description>Ensira seu ID de eleitor</Step.Description>
        //     </Step.Content>
        //   </Step>
      
        //   <Step disabled>
        //     {/* <Icon name='payment' /> */}
        //     <Step.Content>
        //       <Step.Title>Candidato</Step.Title>
        //       <Step.Description>Insira o código do candidato que deseja votar </Step.Description>
        //     </Step.Content>
        //   </Step>
      
        //   <Step disabled>
        //     {/* <Icon name='info' /> */}
        //     <Step.Content>
        //       <Step.Title>Voto</Step.Title>
        //       <Step.Description>Confirme seu voto</Step.Description>
        //     </Step.Content>
        //   </Step>
        // </Step.Group>

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
