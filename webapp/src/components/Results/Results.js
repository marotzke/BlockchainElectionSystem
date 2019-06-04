import React, { Component } from 'react'
import { Header, Image, Table, Card, Icon, Label} from 'semantic-ui-react'
import styles from './Results.module.scss'; 

const names = ["matthew","mark","molly"]
const data1 = [
    {
        "id": 0,
        "name": "Joao",
        "party": "PT",
        "voteCount": 112
    },
    {
        "id": 1,
        "name": "Otavio",
        "party": "PSDB",
        "voteCount": 87
    },
    {
        "id": 2,
        "name": "Marcos",
        "party": "CINSPER",
        "voteCount": 83
    },
]

export default class Results extends Component {
    constructor(props){
        super(props)
        this.state = {
            candidates : null
        }
    }

    componentWillMount() {
        // this.setState({candidates: data1}) // UNCOMMENT TO TEST WITHOUT SERVER-SIDE 
        fetch('http://localhost:3000/results')
        .then(response => response.json())
        .then(data => 
            this.setState({candidates: data})
            )
        .catch((err) => console.log(err));
      }

    render() {
        let main = null
        let candidateHeader = null
        if (this.state.candidates != null) {
        
        let max = Math.max.apply(Math, this.state.candidates.map(function(o) { return o.voteCount; }))
        const candidate = this.state.candidates.find( c => c.voteCount === parseInt(max,10) );
        candidateHeader = 
        <Card>
          <Image 
            fluid
            label={{ as: 'a', corner: 'left', color:"green", icon: 'winner' }}
            src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
            wrapped 
            ui={false} />
          <Card.Content>
          
            <Card.Header>{candidate.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{candidate.party}</span>
            </Card.Meta>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    NÚMERO DE VOTOS: {candidate.voteCount}
                </a>
            </Card.Content>
            <Label as='a' color='green' ribbon className={styles.tag}>
            Candidato Eleito
          </Label>
          </Card.Content>
        </Card>
        
        
        main = <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Candidatos</Table.HeaderCell>
                <Table.HeaderCell>Votos</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {this.state.candidates.map(function(item) {
                return <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Image src={"https://react.semantic-ui.com/images/avatar/small/"+names[(Math.random() * names.length) | 0] +".png"} rounded size='mini' />
                    <Header.Content>
                      {item.name}
                      <Header.Subheader>{item.party}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{item.voteCount}</Table.Cell>
              </Table.Row>;
                }) }
        
            </Table.Body>
          </Table>;
          } else {
            main = <div className={styles.content}>
                <Header as='h3'> Eleições ainda não encerradas.</Header>
                <Header as='h3'> Por favor retorne mais tarde para obter os resultados.</Header>
            </div>
          }
        return (
            <div className={styles.content}>
                {candidateHeader}
                {main}
            </div>
        )
    }
}
