import React from 'react';
import $ from 'jquery';

import './Table.css';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page: 10,
            col: Object.keys(props.cols)[0],
            asc: -1
        }
    }
    changePage(c,total) {
        if (c<0 & this.state.offset+c>=0) {
            this.setState({offset: (this.state.offset+c)})
        } else if( c>0 & this.state.offset+c<this.props.data.length) {
            this.setState({offset: (this.state.offset+c)})
        }
    }
    
    render() {
        const ids = Object.keys(this.props.cols);
        let v = this.state.col;
        let data = this.props.data.sort((row1,row2)=>row1[v]>row2[v]?(-this.state.asc): (this.state.asc));
        let pages = Math.ceil(data.length/this.state.page);
        data = data.slice(this.state.offset,this.state.offset+this.state.page);
        const head = (<tr>{ids.map(id=>(<th onClick={()=>this.setState({col: id, asc: -1 * this.state.asc})}>{this.props.cols[id]}</th>))}</tr>);
        const body = data.map(  row=> 
                              <tr key={row._id} onClick={()=>this.props.handleRow(row._id)}> 
                                {ids.map(id => <td>{row[id]}</td> )} 
                              </tr>  );
        const filters = ids.map(id=> 
            (<div>
                <label>filter {this.props.cols[id]} </label> 
                <input type="text" name={id}></input>
            </div>)
        );
        console.log('table render ===>>> ', $('#form').serialize());
        return (
                <div className="table-container">
                    <label> page {this.state.offset/this.state.page + 1}/{pages}, tasks {this.state.offset+1}-{this.state.offset+this.state.page} </label>
                    <button onClick={()=>this.changePage(-this.state.page)}> prev page </button>
                    <button onClick={()=>this.changePage(this.state.page)}> next page </button>
                    <table> 
                        <thead>{head}</thead>
                        <tbody>{body}</tbody>
                   </table>
               </div>);
     }
}
 
export default Table;
