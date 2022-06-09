import React from 'react';
import axios from "axios";
import {ProjectCardList} from './Project';
import {Project} from './Project';
import Login from './Login';
import Table from './Tasks';
import ReactJson from 'react-json-view'
import './Project.css';



class Client extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              task: [],
              project: [],
              tasks: [],
              filters: {status: 'in-progress'},
              projects: [{project_name: "test", created_at: "test"}]
          };
          this.allProjects();
      }
      allProjects() {
          axios.get('/api/v1/all-projects',{headers: {token: this.props.API_token}}).then((response) => {
              this.setState({projects: response.data.data.projects, project: []});
          });
      }
      getProject(project_id) {
          const headers = {token: this.props.API_token, project_id: project_id};
          console.log(headers);
          axios.get('/api/v1/project',{headers: headers}).then((response) => {
              this.setState({project: [response.data.data]});
              // this.allTasks(response.data.data.project_id,'in-progress');
              this.allTasksData(response.data.data.project_id,status=this.state.filters.status);
          });
      }
      cancelLabeler(project_id,email) {
          console.log('cancel request', project_id, email);
          const params = {email: email};
          const headers = {token: this.props.API_token, project_id: project_id, "Content-Type": "application/json"};
          axios.delete('/api/v1/cancel-labeler',{headers: headers, params: params}).then((response) => {
              console.log('cancelled response: ',response);
              this.getProject(project_id);
          });
      }
      addLabelers(project_id,emails) {
          console.log('add request', project_id,emails);
          const headers = {token: this.props.API_token, project_id: project_id, "Content-Type": "application/json"};
          const data = {emails: emails};
          axios.post('/api/v1/add-labelers',data, {headers: headers}).then((response) => {
              console.log('add labelers response: ',response);
              this.getProject(project_id);
          });
      }
      allTasks(project_id, status) {
          console.log('get-all-tasks request');
          const headers = {token: this.props.API_token, project_id: project_id};
          const params = {status: status};
          axios.get('/api/v1/tasks',{params: params, headers: headers}).then((response)=>{
              this.setState({'tasks': response.data.data.tasks});
          });
      }
      allTasksData(project_id,status,total_labels) {
          const params = {project_id: project_id, status: status};
          axios.get('/dash/admin/get-task-data', {params: params}).then((response)=>{
              this.setState({'tasks': response.data.data});
          });
      }
    
      getTask(project_id, task_id) {
          console.log('get-task request', task_id);
          const headers = {token: this.props.API_token, project_id: project_id};
          const params = {task_id: task_id};
          axios.get('/api/v1/task',{params: params, headers: headers}).then((response)=>{
              const task_data = response.data.data;
              this.setState({'task_data': this.state.task_data.concat([task_data])});
              this.setState({'task': task_data});
              console.log(this.state.task_data);
          });
      }
      filter(name, value) {
          this.setState({filters: {name: value}});
      }
        

      render() {
          console.log('rendered');
          if (this.state.project.length>0) {
              let data = this.state.project[0];
              return (
                <div className="flex-container">
                     <div className="container column">
                          <button  onClick={() => this.allProjects()}>  Back </button>
                          <Project data={data} 
                                    cancelLabeler={(email)=>this.cancelLabeler(data.project_id,email)}
                                    addLabelers={(emails)=>this.addLabelers(data.project_id,emails)}
                           />
                    </div>
                      <div className="container column"> 
                          <h3>Tasks:</h3>
                            <Table data={this.state.tasks} 
                                    handleRow={(task_id)=>this.getTask(data.project_id, task_id)}
                                     cols={{status: "Status", total_labels: "total labels", title: "Title", description: "Description"}}/>
                      </div> 
                      <div className="container column">
                          <h3>Loaded task</h3>
                          <ReactJson src={this.state.task} />
                      </div>
                </div>
              );
          } else {
              let projects = this.state.projects.filter(proj=>proj.project_name.length==4 | proj.project_name.length==3);
              return (
                <div>
                    {<ProjectCardList projects={projects.reverse()} getProject={(pid)=>this.getProject(pid)}/>}
                </div>
              );
          }
      }
}

export default Client;