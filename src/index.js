import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InsertionSorter from './sorters/insertionSorter.js';
import QuickSorter from './sorters/quickSorter.js';
import MergeSorter from "./sorters/mergeSorter.js";
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArrayComponent from "./array.js";
  
class Game extends React.Component {

    constructor(props) {
        super(props);
        let arraySizes = [50, 45, 40, 35, 30, 25, 20, 10, 5];
        let size = arraySizes[0], low = 50, range = 500;
        let heights = this.getRandomArray({low, range, size});
        this.arraySizes = arraySizes;
        this.size = size; this.low = low; this.range = range;
        this.width = 25; this.maxHeight = low + range;
        this.sorterMap = {
            "qs": QuickSorter,
            "is": InsertionSorter,
            "ms": MergeSorter
        };

        this.state = {
            "heights": heights,
            "helper": Array(0).fill(0)
        }
    }

    getRandomArray({low, range, size}) {
        let heights = Array(size);
        for(let ix = 0; ix < size; ix++) {
            heights[ix] = parseInt(Math.random() * range + low);
        }

        return heights;
    }

    modifyState({heights, generateHeights, helper}) {
        let size = parseInt(document.getElementById("arraySize").value);
        this.size = size;
        if (generateHeights) heights = this.getRandomArray({"low": this.low, "range": this.range, "size": size});
        this.setState({
            "heights": heights? heights: this.state.heights,
            "helper": helper? helper: Array(this.size).fill(0)
        });
    }

    createSorter() {
        let sorterId = document.getElementById("sortSelector").value, delay = parseInt(document.getElementById("speedSelector").value);
        return new this.sorterMap[sorterId](this.state.heights, (hts, helper) => this.setArray(hts, helper), delay);
    }

    reset() {
        this.modifyState({"generateHeights": true, helper: Array(0)});
    }

    setArray(heights, helper) {
        this.modifyState({
            "heights": heights,
            "helper": helper? helper: this.state.helper
        });
    }

    render() {
        let arraySizesOptions = [];

        for(let arraySize of this.arraySizes) arraySizesOptions.push(<option value={"" + arraySize}>{arraySize}</option>);
        
        return (
            <div className="game" style={{"margin": "25px"}}>
                <Jumbotron>
                    <br /><br /><br />
                    <Form.Label><b>Array size</b></Form.Label>
                    <Form.Control style={{"margin": "5px"}} id="arraySize" as="select">
                        {arraySizesOptions}
                    </Form.Control>
                    <Form.Label><b>Sort to use:</b></Form.Label>
                    <Form.Control style={{"margin": "5px"}} id="sortSelector" as="select">
                        <option value="ms">Merge Sort</option>
                        <option value="is">Insertion Sort</option>
                        <option value="qs">Quick Sort</option>
                    </Form.Control>
                    <Form.Label><b>Delay between operations:</b></Form.Label>
                    <Form.Control style={{"margin": "5px"}} id="speedSelector" as="select" title="Delay between operations">
                        <option value="50">50ms</option>
                        <option value="100">100ms</option>
                        <option value="200">200ms</option>
                        <option value="300">300ms</option>
                    </Form.Control>
                    <Button style={{"margin": "5px"}} onClick={() => this.reset()}>Reset</Button>
                    <Button style={{"margin": "5px"}} onClick={() => this.createSorter().sort()}>Sort Array</Button>
                    <br /><br />
                    <ArrayComponent heights={this.state.heights} maxHeight={this.maxHeight} width={this.width} color="SlateBlue"/>
                    <ArrayComponent heights={this.state.helper} maxHeight={this.maxHeight} width={this.width} color="MediumSeaGreen"/>
                </Jumbotron>
            </div>
        );
    }
}
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  