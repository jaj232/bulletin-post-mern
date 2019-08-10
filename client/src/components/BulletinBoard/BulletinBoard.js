import React from 'react';
import './BulletinBoard.css';
import Utils from './utils';
import Api from '../../services/api';


import MaterialTable from 'material-table';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';



class BulletinBoard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: 'Title', field: 'title' },
        { title: 'Body', field: 'body' },
        { title: 'Upvote', field: 'upvoteCount', type: 'numeric', initialEditValue: '0'},
        { title: 'Downvote', field: 'downvoteCount', type: 'numeric', initialEditValue: '0'},
        { title: 'Tags', field: 'tags'},
        { title: 'Date Created', field: 'dateCreated', editable: 'never'}
      ],
      data: [],
      isLoading: true
    };

  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    this.setState({isLoading: true});
    Api.getAllPosts()
    .then((res) => {
      let data = res.data;
      for (let i=0;i<data.length;i++) {
        if(data[i].tags && data[i].tags.length) {
          data[i].tags = data[i].tags.join(',');
        }
        data[i].dateCreated = Utils.getDateFormat(data[i].dateCreated);
      }
      this.setState({data: data});
    })
    .catch((error) => { console.log('Request failed', error); })
    .finally(() => this.setState({isLoading: false}));
  }

  render () {
console.log(this.state);
    return (
      <div>
        <MaterialTable
          columns={this.state.columns}
          data={this.state.data}
          detailPanel={rowData => {
            return (
              <div style={{padding: '10px'}}>
                <Card>
                  <CardContent>
                    <div className="card-title">{rowData.title}</div>
                    <div className="card-body">{rowData.body}</div>
                  </CardContent>
                  <CardActions>
                    <div className="card-votes">
                      <Icon onClick={() => {console.log('upvote');}}color="primary">thumb_up</Icon>{rowData.upvoteCount}
                      <Icon onClick={() => {console.log('downvote');}} color="error">thumb_down</Icon>{rowData.downvoteCount}
                    </div>
                  </CardActions>
                  <CardActions>
                    <div className="card-tags">Tags: {rowData.tags}</div>
                  </CardActions>
                  <CardActions>
                    <div className="card-dateCreated">Date Created: {rowData.dateCreated}</div>
                  </CardActions>
                </Card>
              </div>
            )
          }}
          isLoading={this.state.isLoading}
          onRowClick={(event, rowData, togglePanel) => togglePanel()}
          options={{
            pageSize: 10,
            padding: 'dense',
            showTitle: false
          }}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                this.setState({ isLoading: true });
                Api.createPost(newData)
                .then((res) => {
                  console.log('res',res);
                })
                .catch((error) => { console.log('Request failed', error); })
                .finally(() => {
                  resolve();
                  this.getPosts();
                })
              }),
            onRowUpdate: newData =>
              new Promise(resolve => {
                this.setState({ isLoading: true });
                console.log('onRowUpdate', newData);
                Api.updatePost(newData._id, newData)
                .then((res) => {
                  console.log('res',res);
                })
                .catch((error) => { console.log('Request failed', error); })
                .finally(() => {
                  resolve();
                  this.getPosts();
                })
              }),
            onRowDelete: newData =>
              new Promise(resolve => {
                this.setState({ isLoading: true });
                Api.deletePost(newData._id)
                .then((res) => {
                  console.log('res',res);
                })
                .catch((error) => { console.log('Request failed', error); })
                .finally(() => {
                  resolve();
                  this.getPosts();
                })
              })
          }}
        />
      </div>
    )
  }

}

export default BulletinBoard;