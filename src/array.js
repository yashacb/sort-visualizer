import React from 'react';

function Rectangle(props) {
    return (
        <div style={{display:"table-cell"}}>
            <div style={{height: (props.maxHeight - props.height)+"px", width: props.width+"px", "background-color": 'rgba(0,0,0,0)', "margin": "2px"}}></div>
            <div style={{height:  props.height+"px", width: props.width+"px", "background-color": props.color, "margin": "2px"}}></div>
            <div>{props.value}</div>
        </div>
    );
}

class ArrayComponent extends React.Component {
    render() {
        let rectangles = [];

        for(let ix = 0; ix < this.props.heights.length; ix++) {
            rectangles.push(<Rectangle value={this.props.heights[ix]} maxHeight={this.props.maxHeight} width={this.props.width} height={this.props.heights[ix]} color={this.props.color}/>);
        }

        return (
            <div>
                { rectangles }
            </div>
        );
    }
}

export default ArrayComponent;