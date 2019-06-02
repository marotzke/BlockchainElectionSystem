import React, { Component } from 'react'
import { Header, Image, Table } from 'semantic-ui-react'

export default class Results extends Component {
    constructor(props){
        super(props)
        this.state = {
            candidate1 : {
                name: "Matheus Marotzke",
                party:"INSCOMP",
                voteCount:2
            },
            candidate2 : {
                name: "Marcelo Andrade",
                party:"CISP",
                voteCount:21
            }
        }
    }

    componentWillMount() {
        fetch('http://localhost:8545/results')
          .then(response => response.json())
          .then(data => 
            console.log(data)
            // this.setState({ data })
            
            );
      }

    render() {
        return (
            <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Candidatos</Table.HeaderCell>
                <Table.HeaderCell>Votos</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
        
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' rounded size='mini' />
                    <Header.Content>
                      {this.state.candidate1.name}
                      <Header.Subheader>{this.state.candidate1.party}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.state.candidate1.voteCount}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h4' image>
                    <Image src='https://react.semantic-ui.com/images/avatar/small/mark.png' rounded size='mini' />
                    <Header.Content>
                    {this.state.candidate2.name}
                      <Header.Subheader>{this.state.candidate2.party}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.state.candidate2.voteCount}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )
    }
}
