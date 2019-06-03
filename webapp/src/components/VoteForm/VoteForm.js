import React, { Component } from 'react'
import { Button, Form, Card, Placeholder, Image, Header, Flag } from 'semantic-ui-react'

const data1 = [
  {
      "id": 0,
      "name": "Joao",
      "party": "PT",
  },
  {
      "id": 1,
      "name": "Otavio",
      "party": "PSDB",
  },
  {
      "id": 2,
      "name": "Marcos",
      "party": "CINSPER",

  },
]

export default class VoteForm extends Component {
    constructor(props){
      super(props)
      this.state = {
        voted: false,
        candidates: null,
        candidateId: -1,
        voterId: -1
      };
    }

    componentWillMount() {
      this.setState({candidates: data1}) // UNCOMMENT TO TEST WITHOUT SERVER-SIDE
      fetch('http://localhost:8545/info')
      .then(response => response.json())
      .then(data => 
          this.setState({candidates: data})
          );
    }

    vote = (e) => {
      if(this.state.candidateId == -1){
        alert("ID do Eleitor não específicado")
      }else if(this.state.candidateId == -1 ){
        alert("Código do Candidato não específicado")
      }else{
        this.setState({voted:true})
        fetch('http://localhost:8545/vote/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.state.candidateId,
            address: this.state.voterId,
          })
        }).then((response) => {
          if(response.status != 200){
            alert("Algo de errado ocorreu.")
          }else{
            this.setState({voted:true})
          }
        })
      } 
    }

    handlecandidateId (e) { console.log(e.target.value); this.setState({candidateId:e.target.value}); }
    handlevoterId (e) { this.setState({voterId:e.target.value}); }

    render() {
      let main
      let button
      let candidateHeader
      if(this.state.voted){
        main = <Header >Parabéns! Você contribuiu com um voto mais seguro, auditável e que fará a diferença em seu país! <Flag name='brazil' /> </Header>
        button = null
      }else{
        main = <div>
        <Form.Field>
          <label>Código do Candidato</label>
          <input onChange={this.handlecandidateId.bind(this)}/>
        </Form.Field>
        <Form.Field>
          <label>ID do Eleitor</label>
          <input onChange={this.handlevoterId.bind(this)}/>
        </Form.Field>
        </div>
        
        candidateHeader =  <Card>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Card.Header>
          <Placeholder><Placeholder.Line /></Placeholder>
          </Card.Header>
          <Card.Meta>
          <Placeholder><Placeholder.Line /></Placeholder>
          </Card.Meta>
        </Card.Content>
      </Card>
        button = <Button disabled type='submit' onClick={this.vote}>Votar</Button>
        if (this.state.candidates != null) {
          const candidate = this.state.candidates.find( c => c.id === parseInt(this.state.candidateId,10) );
          console.log(candidate)
          if(candidate != null){
            candidateHeader = <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
              <Card.Header>{candidate.name}</Card.Header>
              <Card.Meta>
                <span className='date'>{candidate.party}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
            if(this.state.voterId !== -1){
              button = <Button type='submit' onClick={this.vote}>Votar</Button>
            }
          }
        }
      }
        return (
          <div> 
            {candidateHeader}
            <Form>
            {main}
            {button}
            
          </Form>
          </div>
        )
    }
}
