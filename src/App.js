import React, { Component } from 'react';
// import './App.css';
import {
    CardGrid,
    Row,
    Col,
    MenuItem,
    Card,
    CardTitle,
    CardBody,
    CardFooter,
    CardDropdownButton,
    Icon,
    CardLink,
    CardHeading,

} from 'patternfly-react';
import { MockClientPaginationTable } from './MockClientPaginationTable';
import MockModalManager from './ui/MockModalManager';
import { TablePfProvider, TableHeader, } from 'patternfly-react/dist/js/components/Table';
import { SimpleTable } from './ui/SimpleTable';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedContent: []
        };
    }

    setSelectedContent = (selectedContentArr) => {
        this.setState({ selectedContent: selectedContentArr })
        console.log("APPA", this.state)
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xs-12'>
                    <MockModalManager rightSide={false} setSelectedContent={this.setSelectedContent} />
                    <SimpleTable content={this.state.selectedContent} />
                </div>
            </div>
        )
    }
}

export default App;