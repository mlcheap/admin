import React from 'react';
import './Project.css';

function ProjectCard(props) {
    return (
        <div key={props.data.project_name} className="card" onClick={()=> props.getProject()}>
          <div className="container">
            <h4><b>{props.data.project_name}</b></h4> 
            <p>crated at {props.data.created_at}</p> 
          </div>
        </div>
        );
}

function ProjectCardList(props) {
    return (
        <div>
        {props.projects.map((proj) => <ProjectCard data={proj} getProject={()=>props.getProject(proj.project_id)}/>)}
        </div>
        );
}

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }
    
    render() {
        let data = Object.assign(this.props.data);
        let items = Object.keys(data).filter(k=> typeof(data[k])=="string" | typeof(data[k])=="number");
        items = items.map(k=>(<li><b>{k}: </b>{data[k]}</li>));
        return (
            <div>
              <h2>Project name: {data.project_name}</h2>
              <h2>Active Labelers:</h2>
              <ul>
                {data.stat.labelers.active_labelers.map(labeler =>
                <li>
                    <button onClick={()=>this.props.cancelLabeler(labeler.email)}>Remove</button>
                    &nbsp;&nbsp; 
                    {labeler.email}
                </li>)}
              </ul>
              <h2>Deactivated Labelers:</h2>
              <ul>
                {data.stat.labelers.deactivated_labelers.map(labeler => 
                <li>
                    <button onClick={()=>this.props.addLabelers([labeler.email])}>Add</button>
                    &nbsp;&nbsp; 
                    {labeler.email} 
                </li>)}
              </ul>
              <h2>Add labeler</h2>
              <label>
                email
                <input type="email" name="email" onChange={(event)=>this.setState({email: event.target.value})}/>
                    <input type="submit" value="add labeler" onClick={()=>this.props.addLabelers([this.state.email])}/>
              </label>
            </div>
        );
    }
}


export  { Project, ProjectCardList };
